import React from 'react';
import { Form, Icon, FormInputProps } from 'semantic-ui-react';

type InputProps = FormInputProps & {
  icon?: string;
  isClearIconVisible: boolean;
};

const CustomInput = ({
  icon,
  isClearIconVisible,
  onClear,
  onClick,
  value,
  ...rest
}: InputProps) => (
  <Form.Input
    {...rest}
    icon={
      <Icon
        link
        name={isClearIconVisible ? 'close' : icon}
        onClick={isClearIconVisible ? onClear : onClick}
      />
    }
    onClick={onClick}
    value={value}
  />
);

CustomInput.defaultProps = {
  icon: 'calendar',
};

export default CustomInput;
