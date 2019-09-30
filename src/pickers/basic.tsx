import React from 'react';
import { BasicDatePickerProps } from '../types';
import BaseDatePicker from './base';

class DatePicker extends React.Component<BasicDatePickerProps> {
  /* eslint-disable-next-line */
  _handleOnDateSelected = ({ selected, selectable, date }) => {
    const { selected: selectedDate, onChange, onDateSelected } = this.props;
    if (onDateSelected) {
      onDateSelected({ selected, selectable, date });
    }

    if (!selectable) {
      return;
    }

    let newDate = date;
    if (selectedDate && selectedDate.getTime() === date.getTime()) {
      newDate = null;
    }

    if (onChange) {
      onChange(newDate);
    }
  };

  render() {
    return (
      <BaseDatePicker
        {...this.props}
        onDateSelected={this._handleOnDateSelected}
      />
    );
  }
}

export default DatePicker;
