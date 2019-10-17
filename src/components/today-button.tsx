import React from 'react';
import { Button } from 'semantic-ui-react';

type TodayButtonProps = {
  end?: boolean;
  hovered?: boolean;
  inRange?: boolean;
  selectable?: boolean;
  selected?: boolean;
  start?: boolean;
  today?: boolean;
};

const style: React.CSSProperties = { marginTop: 10 };

const TodayButton: React.FC<TodayButtonProps> = ({
  end,
  hovered,
  inRange,
  selectable,
  selected,
  start,
  today,
  ...otherProps
}) => (
  <Button
    className="clndr-button-today"
    compact
    data-testid="datepicker-today-button"
    fluid
    style={style}
    {...otherProps}
  />
);

export default TodayButton;
