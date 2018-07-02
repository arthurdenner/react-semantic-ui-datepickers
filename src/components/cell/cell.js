import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './cell.css';

const CalendarCell = ({
  selectable,
  selected,
  selectedClassName,
  today,
  nextMonth,
  prevMonth,
  ...otherProps
}) => (
  <span
    className={cn('clndr-cell', {
      'clndr-cell-today': today,
      'clndr-cell-disabled': !selectable,
      'clndr-cell-other-month': nextMonth || prevMonth,
      [selectedClassName]: selected,
    })}
    {...otherProps}
  />
);

CalendarCell.propTypes = {
  nextMonth: PropTypes.bool,
  prevMonth: PropTypes.bool,
  selected: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedClassName: PropTypes.string,
  today: PropTypes.bool,
};

CalendarCell.defaultProps = {
  selectedClassName: 'clndr-cell-selected',
  nextMonth: false,
  prevMonth: false,
};

export default CalendarCell;
