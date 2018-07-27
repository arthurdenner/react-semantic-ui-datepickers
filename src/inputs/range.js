import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { formatDate, omit, pick, moveElementsByN } from '../utils';
import { monthNamesEng, semanticInputProps, weekdayNamesEng } from '../data';
import Calendar from '../components/calendar';
import RangeDatePicker from '../dayzed-pickers/RangeDatePicker';
import BaseInput from './index';

const initialState = {
  isVisible: false,
  selectedDate: [],
  selectedDateFormatted: '',
};

class RangeInput extends BaseInput {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    monthNames: PropTypes.array,
    onDateChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    todayButtonText: PropTypes.string,
    weekdayNames: PropTypes.array,
  };

  static defaultProps = {
    date: undefined,
    format: 'YYYY-MM-DD',
    monthNames: monthNamesEng,
    placeholder: null,
    todayButtonText: 'Today',
    weekdayNames: weekdayNamesEng,
  };

  state = initialState;

  onDateSelected = newDates => {
    const { format, onDateChange } = this.props;

    if (!newDates.length) {
      this.setState(initialState, () => onDateChange(null));

      return;
    }

    const newState = {
      selectedDate: newDates,
      selectedDateFormatted: newDates
        .map(newDate => formatDate(newDate, format))
        .join(' - '),
    };

    this.setState(newState, () => {
      onDateChange(newDates);

      if (newDates.length === 2) {
        this.setState({ isVisible: false });
      }
    });
  };

  get dayzedProps() {
    return omit(semanticInputProps, this.props);
  }

  get inputProps() {
    const props = pick(semanticInputProps, this.props);
    const placeholder = props.placeholder || this.props.format;

    return {
      ...props,
      placeholder,
    };
  }

  get weekdayNames() {
    const { firstDayOfWeek } = this.dayzedProps;
    const { weekdayNames } = this.props;

    return moveElementsByN(firstDayOfWeek, weekdayNames);
  }

  render() {
    const { isVisible, selectedDate, selectedDateFormatted } = this.state;
    const { date, monthNames, todayButtonText } = this.props;

    return (
      <div
        style={{ display: 'inline-block' }}
        ref={el => {
          this.el = el;
        }}
      >
        <Input
          {...this.inputProps}
          onClick={this.showCalendar}
          icon="calendar"
          readOnly
          value={selectedDateFormatted}
        />
        {isVisible && (
          <RangeDatePicker
            {...this.dayzedProps}
            monthsToDisplay={2}
            onChange={this.onDateSelected}
            selected={selectedDate}
            date={date}
          >
            {props => (
              <Calendar
                {...props}
                monthNames={monthNames}
                todayButtonText={todayButtonText}
                weekdayNames={this.weekdayNames}
              />
            )}
          </RangeDatePicker>
        )}
      </div>
    );
  }
}

export default RangeInput;
