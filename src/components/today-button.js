import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const style = { marginTop: 10 };

const TodayButton = ({
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
    fluid
    style={style}
    {...otherProps}
  />
);

TodayButton.propTypes = {
  end: PropTypes.bool,
  hovered: PropTypes.bool,
  inRange: PropTypes.bool,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  start: PropTypes.bool,
  today: PropTypes.bool,
};

export default TodayButton;
