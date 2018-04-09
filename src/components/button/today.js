import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const TodayButton = ({ selectable, selected, today, ...otherProps }) => (
  <Button
    compact
    fluid
    selectable={selectable.toString()}
    selected={selected.toString()}
    today={today.toString()}
    style={{ marginTop: 10 }}
    {...otherProps}
  >
    Today
  </Button>
);

TodayButton.propTypes = {
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  today: PropTypes.bool,
};

export default TodayButton;
