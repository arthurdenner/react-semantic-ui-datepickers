import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { omit } from '../../utils';

const propsToIgnore = ['hovered', 'end', 'inRange', 'start'];

const TodayButton = ({ selectable, selected, today, ...rest }) => {
  const otherProps = omit(propsToIgnore, rest);

  return (
    <Button
      compact
      fluid
      selectable={selectable.toString()}
      selected={selected.toString()}
      today={today.toString()}
      style={{ marginTop: 10 }}
      {...otherProps}
    />
  );
};

TodayButton.propTypes = {
  inRange: PropTypes.bool,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  today: PropTypes.bool,
};

export default TodayButton;
