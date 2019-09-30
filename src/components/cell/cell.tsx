import cn from 'classnames';
import React from 'react';
import './cell.css';

type CalendarCellProps = {
  end?: boolean;
  hovered?: boolean;
  inRange?: boolean;
  nextMonth?: boolean;
  prevMonth?: boolean;
  selectable?: boolean;
  selected?: boolean;
  start?: boolean;
  today?: boolean;
  title?: string;
};

const CalendarCell: React.FC<CalendarCellProps> = ({
  end,
  hovered,
  inRange,
  nextMonth,
  prevMonth,
  selectable,
  selected,
  start,
  today,
  ...otherProps
}) => (
  <span
    className={cn('clndr-cell', {
      'clndr-cell-today': today,
      'clndr-cell-disabled': !selectable,
      'clndr-cell-other-month': nextMonth || prevMonth,
      'clndr-cell-inrange': inRange,
      'clndr-cell-selected': selected,
    })}
    {...otherProps}
  />
);

CalendarCell.defaultProps = {
  end: false,
  hovered: false,
  inRange: false,
  nextMonth: false,
  prevMonth: false,
  start: false,
};

export default CalendarCell;
