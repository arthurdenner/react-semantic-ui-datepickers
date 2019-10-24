import React from 'react';
import { BasicDatePickerProps } from '../types';
import BaseDatePicker from './base';

class DatePicker extends React.Component<BasicDatePickerProps> {
  _handleOnDateSelected = ({ selectable, date }, event) => {
    const { selected: selectedDate, onChange } = this.props;

    if (!selectable) {
      return;
    }

    let newDate = date;
    if (selectedDate && selectedDate.getTime() === date.getTime()) {
      newDate = null;
    }

    if (onChange) {
      onChange(newDate, event);
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
