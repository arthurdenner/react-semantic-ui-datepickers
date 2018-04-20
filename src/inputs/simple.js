import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import isEqual from 'date-fns/is_equal';
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
  };

  onDateSelected = ({ selectable, date }) => {
    if (!selectable) {
      return;
    }

    const { onDateSelected } = this.props;

    this.setState(({ selectedDate }) => {
      let newDate = date;

      if (selectedDate && isEqual(selectedDate, date)) {
        newDate = null;
      }

      onDateSelected(date);

      return {
        isCalendarVisible: false,
        selectedDate: newDate,
      };
    });
  };

  showCalendar = () => {
    this.setState(({ isCalendarVisible }) => ({
      isCalendarVisible: !isCalendarVisible,
    }));
  };

  render() {
    const { date, format, inputProps } = this.props;
    const { isCalendarVisible, selectedDate } = this.state;

    return (
      <div id="test">
        <Form.Input
          icon="calendar"
          onChange={() => {}}
          onClick={this.showCalendar}
          placeholder={format}
          value={formatDate(selectedDate, format)}
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
