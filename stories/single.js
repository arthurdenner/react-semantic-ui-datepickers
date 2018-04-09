import React from 'react';
import Calendar from '../src';

class Single extends React.Component {
  state = {
    selectedDate: null,
  };

  handleOnDateSelected = ({ selected, selectable, date }) => {
    if (!selectable) {
      return;
    }
    this.setState(({ selectedDate }) => {
      let newDate = date;

      if (selectedDate && selectedDate.getTime() === date.getTime()) {
        newDate = null;
      }

      return { selectedDate: newDate };
    });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <div style={{ margin: 50 }}>
        <Calendar
          selected={this.state.selectedDate}
          onDateSelected={this.handleOnDateSelected}
        />
      </div>
    );
  }
}

export default Single;
