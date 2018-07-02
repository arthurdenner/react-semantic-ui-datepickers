import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { formatDate, omit, pick } from '../utils';
import { semanticInputProps } from '../data';
import Calendar from '../components/calendar';
import Portal from '../components/portal';
import RangeDatePicker from '../dayzed-pickers/RangeDatePicker';

const initialState = {
  isCalendarVisible: false,
  selectedDate: [],
  selectedDateFormatted: '',
};

class RangeInput extends Component {
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

  onDateSelected = newDates => {
    const { format, onDateChange } = this.props;

    if (!newDates.length) {
      this.setState(initialState, () => onDateChange(null));

      return;
    }

    const newState = {
      // isCalendarVisible: false,
      selectedDate: newDates,
      // selectedDateFormatted: formatDate(newDate, format),
    };

    this.setState(newState, () => onDateChange(newDates));
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
            <RangeDatePicker
              {...this.dayzedProps}
              monthsToDisplay={2}
              onChange={this.onDateSelected}
              selected={selectedDate}
              date={date}
            >
              {props => <Calendar {...props} fluid={fluid} />}
            </RangeDatePicker>
          </Portal>
        )}
      </div>
    );
  }
}

export default RangeInput;
