import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from 'semantic-ui-react';

const CustomInput = ({ isIconClickable, onClear, onClick, value, ...rest }) => (
  <Input
    {...rest}
    onClick={onClick}
    icon={
      <Icon
        link
        name={isIconClickable ? 'close' : 'calendar'}
        onClick={isIconClickable ? onClear : onClick}
      />
    }
    readOnly
    value={value}
  />
);

CustomInput.propTypes = {
  isIconClickable: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CustomInput;
