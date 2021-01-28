import cn from 'classnames';
import React from 'react';
import './cell.css';

type CalendarCellProps = {
  end?: boolean;
  hovered?: boolean;
  inRange?: boolean;
  inverted?: boolean;
  nextMonth?: boolean;
  prevMonth?: boolean;
  selectable?: boolean;
  selected?: boolean;
  start?: boolean;
  today?: boolean;
  title?: string;
};

const CalendarCell: React.FC<CalendarCellProps> = ({
  children,
  end,
  hovered,
  inRange,
  inverted,
  nextMonth,
  prevMonth,
  selectable,
  selected,
  start,
  today,
  ...otherProps
}) => {
  const className = cn('clndr-cell', {
    inverted,
    'clndr-cell-today': today,
    'clndr-cell-disabled': !selectable,
    'clndr-cell-other-month': nextMonth || prevMonth,
    'clndr-cell-inrange': inRange,
    'clndr-cell-selected': selected,
  });

  if (!children || !selectable) {
    return (
      <span className={className} {...otherProps} tabIndex={children ? 0 : -1}>
        {children}
      </span>
    );
  }

  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};

CalendarCell.defaultProps = {
  end: false,
  hovered: false,
  inRange: false,
  nextMonth: false,
  prevMonth: false,
  start: false,
};

export default CalendarCell;
