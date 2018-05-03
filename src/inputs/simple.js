import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import isEqual from 'date-fns/is_equal';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';
import { formatDate } from '../utils';
import Calendar from '../components/calendar';
import Portal from '../components/portal';

class SimpleInput extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    inputProps: PropTypes.object,
    onDateSelected: PropTypes.func.isRequired,
  };

  static defaultProps = {
    date: undefined,
    format: 'YYYY-MM-DD',
    inputProps: {},
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

    const { format, onDateSelected } = this.props;

    this.setState(({ selectedDate }) => {
      let newDate = date;

      if (selectedDate && isEqual(selectedDate, date)) {
        newDate = null;
      }

      onDateSelected(newDate);

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
    const { format, onDateSelected } = this.props;

    this.setState({
      selectedDate: null,
      selectedDateFormatted: value,
    });

    onDateSelected(null);

    if (value.length === format.length) {
      const newDate = parse(value);

      if (isValid(newDate)) {
        this.setState({
          selectedDate: newDate,
          selectedDateFormatted: formatDate(newDate, format),
        });

        onDateSelected(newDate);
      }
    }
  };

  showCalendar = () => {
    this.setState(({ isCalendarVisible }) => ({
      isCalendarVisible: !isCalendarVisible,
    }));
  };

  render() {
    const { date, format, inputProps } = this.props;
    const {
      isCalendarVisible,
      selectedDate,
      selectedDateFormatted,
    } = this.state;

    return (
      <div id="test">
        <Form.Input
          icon="calendar"
          onBlur={this.handleBlur}
          onChange={this.handleDateChange}
          onClick={this.showCalendar}
          placeholder={format}
          value={selectedDateFormatted}
          {...inputProps}
        />
        {isCalendarVisible && (
          <Portal query="#test">
            <Calendar
              date={selectedDate || date}
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
