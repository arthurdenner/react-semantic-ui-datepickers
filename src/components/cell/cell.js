import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './cell.css';

const CalendarCell = ({
  hovered, // eslint-disable-line
  inRange,
  end, // eslint-disable-line
  start, // eslint-disable-line
  nextMonth,
  prevMonth,
  selectable,
  selected,
  selectedClassName,
  today,
  ...otherProps
}) => (
  <span
    className={cn('clndr-cell', {
      'clndr-cell-today': today,
      'clndr-cell-disabled': !selectable,
      'clndr-cell-other-month': nextMonth || prevMonth,
      'clndr-cell-inrange': inRange,
      [selectedClassName]: selected,
    })}
    {...otherProps}
  />
);

CalendarCell.propTypes = {
  hovered: PropTypes.bool,
  inRange: PropTypes.bool,
  nextMonth: PropTypes.bool,
  prevMonth: PropTypes.bool,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  selectedClassName: PropTypes.string,
  today: PropTypes.bool,
};

CalendarCell.defaultProps = {
  hovered: false,
  inRange: false,
  nextMonth: false,
  prevMonth: false,
  selectedClassName: 'clndr-cell-selected',
};

export default CalendarCell;
