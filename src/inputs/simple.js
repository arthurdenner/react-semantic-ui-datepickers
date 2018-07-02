import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { formatDate, omit, pick } from '../utils';
import { semanticInputProps } from '../data';
import Calendar from '../components/calendar';
import Portal from '../components/portal';
import DatePicker from '../dayzed-pickers/DatePicker';

const initialState = {
  isCalendarVisible: false,
  selectedDate: null,
  selectedDateFormatted: '',
};

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

  state = initialState;

  onDateSelected = newDate => {
    const { format, onDateChange } = this.props;

    if (!newDate) {
      this.setState(initialState, () => onDateChange(null));

      return;
    }

    const newState = {
      isCalendarVisible: false,
      selectedDate: newDate,
      selectedDateFormatted: formatDate(newDate, format),
    };

    this.setState(newState, () => onDateChange(newDate));
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
          onClick={this.showCalendar}
          icon="calendar"
          readOnly
          value={selectedDateFormatted}
        />
        {isCalendarVisible && (
          <Portal query="#test">
            <DatePicker
              {...this.dayzedProps}
              onChange={this.onDateSelected}
              selected={selectedDate}
              date={selectedDate || date}
            >
              {props => <Calendar {...props} fluid={fluid} />}
            </DatePicker>
          </Portal>
        )}
      </div>
    );
  }
}

export default SimpleInput;
