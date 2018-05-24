import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import isEqual from 'date-fns/is_equal';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';
import formatByPattern from 'format-string-by-pattern';
import { formatDate, omit, pick, semanticInputProps } from '../utils';
import Calendar from '../components/calendar';
import Portal from '../components/portal';

class SimpleInput extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    fluid: PropTypes.bool,
    format: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    date: undefined,
    fluid: false,
    format: 'YYYY-MM-DD',
    placeholder: null,
  };

  state = {
    isCalendarVisible: false,
    selectedDate: null,
    selectedDateFormatted: '',
  };

  onDateSelected = ({ selectable, date }) => {
    if (!selectable) {
      return;
    }

    const { format, onDateChange } = this.props;

    this.setState(({ selectedDate }) => {
      let newDate = date;

      if (selectedDate && isEqual(selectedDate, date)) {
        newDate = null;
      }

      onDateChange(newDate);

      return {
        isCalendarVisible: false,
        selectedDate: newDate,
        selectedDateFormatted: formatDate(newDate, format),
      };
    });
  };

  handleBlur = () => {
    const { format } = this.props;
    const { selectedDateFormatted } = this.state;
    const newDate = parse(selectedDateFormatted);

    if (format.length !== selectedDateFormatted.length || !isValid(newDate)) {
      this.setState({
        selectedDateFormatted: '',
      });
    }
  };

  handleDateChange = (evt, { value }) => {
    if (!value) {
      this.setState({
        selectedDate: null,
        selectedDateFormatted: '',
      });

      return;
    }

    const { format, onDateChange } = this.props;
    const formatInputValue = formatByPattern(format);
    const formattedValue = formatInputValue(value.replace(/\D/g, ''));

    this.setState({
      selectedDate: null,
      selectedDateFormatted: formattedValue,
    });

    onDateChange(null);

    if (formattedValue.length === format.length) {
      const newDate = parse(formattedValue, format, new Date());

      if (isValid(newDate)) {
        this.setState({
          selectedDateFormatted: formatDate(newDate, format),
          selectedDate: newDate,
        });

        onDateChange(newDate);
      }
    }
  };

  showCalendar = () => {
    this.setState(({ isCalendarVisible }) => ({
      isCalendarVisible: !isCalendarVisible,
    }));
  };

  get dayzedProps() {
    return omit(semanticInputProps, this.props);
  }

  get inputProps() {
    const props = pick(semanticInputProps, this.props);

    return {
      ...props,
      placeholder: props.placeholder || this.props.format,
    };
  }

  render() {
    const { date, fluid } = this.props;
    const {
      isCalendarVisible,
      selectedDate,
      selectedDateFormatted,
    } = this.state;

    return (
      <div id="test">
        <Form.Input
          {...this.inputProps}
          fluid={fluid}
          onBlur={this.handleBlur}
          onChange={this.handleDateChange}
          onClick={this.showCalendar}
          icon="calendar"
          value={selectedDateFormatted}
        />
        {isCalendarVisible && (
          <Portal query="#test">
            <Calendar
              {...this.dayzedProps}
              date={selectedDate || date}
              fluid={fluid}
              onDateSelected={this.onDateSelected}
              selected={selectedDate}
            />
          </Portal>
        )}
      </div>
    );
  }
}

export default SimpleInput;
