import cn from 'classnames';
import type { PropsWithChildren } from 'react';
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

const CalendarCell = ({
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
}: PropsWithChildren<CalendarCellProps>) => {
  const className = cn('clndr-cell', {
    inverted,
    'clndr-cell-today': today,
    'clndr-cell-disabled': !selectable,
    'clndr-cell-other-month': nextMonth || prevMonth,
    'clndr-cell-inrange': inRange,
    'clndr-cell-selected': selected,
  });

  if (!children) {
    return (
      <span className={className} tabIndex={children ? 0 : -1} {...otherProps}>
        {children}
      </span>
    );
  }

  return (
    <button
      className={className}
      disabled={!selectable}
      type="button"
      {...otherProps}
    >
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
