import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { formatDate, omit, pick } from '../utils';
import { semanticInputProps } from '../data';
import Calendar from '../components/calendar';
import DatePicker from '../dayzed-pickers/DatePicker';
import BaseInput from './index';

const initialState = {
  isVisible: false,
  selectedDate: null,
  selectedDateFormatted: '',
};

class SimpleInput extends BaseInput {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    date: undefined,
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
      isVisible: false,
      selectedDate: newDate,
      selectedDateFormatted: formatDate(newDate, format),
    };

    this.setState(newState, () => {
      onDateChange(newDate);
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

  render() {
    const { isVisible, selectedDate, selectedDateFormatted } = this.state;
    const { date } = this.props;

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
          <DatePicker
            {...this.dayzedProps}
            onChange={this.onDateSelected}
            selected={selectedDate}
            date={selectedDate || date}
          >
            {props => <Calendar {...props} />}
          </DatePicker>
        )}
      </div>
    );
  }
}

export default SimpleInput;
