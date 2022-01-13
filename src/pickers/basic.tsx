import React from 'react';
import { BasicDatePickerProps } from '../types';
import BaseDatePicker from './base';

class DatePicker extends React.Component<BasicDatePickerProps> {
  _handleOnDateSelected = (
    { selectable, date },
    event: React.SyntheticEvent
  ) => {
    const {
      clearOnSameDateClick,
      selected: selectedDate,
      onChange,
    } = this.props;

    if (!selectable) {
      return;
    }

    let newDate = date;
    if (
      selectedDate &&
      selectedDate.getTime() === date.getTime() &&
      clearOnSameDateClick
    ) {
      newDate = null;
    }

    if (onChange) {
      onChange(event, newDate);
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
