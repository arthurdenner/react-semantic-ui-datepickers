import React from 'react';
import { DateObj } from 'dayzed';
import { Button, ButtonProps } from 'semantic-ui-react';

interface TodayButtonProps extends DateObj, ButtonProps {
  end?: boolean;
  hovered?: boolean;
  inRange?: boolean;
  start?: boolean;
}

const style: React.CSSProperties = { marginTop: 10 };

const TodayButton: React.FC<TodayButtonProps> = ({
  'aria-label': ariaLabel,
  children,
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
  <Button
    aria-label={`${ariaLabel}, ${children}`}
    className="clndr-button-today"
    compact
    data-testid="datepicker-today-button"
    fluid
    style={style}
    {...otherProps}
  >
    {children}
  </Button>
);

export default TodayButton;
