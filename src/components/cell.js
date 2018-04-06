import React from 'react';

const CalendarCell = props => (
  <span
    style={{ background: 'white', padding: '5px 0', height: 30 }}
    {...props}
  />
);

export default CalendarCell;
