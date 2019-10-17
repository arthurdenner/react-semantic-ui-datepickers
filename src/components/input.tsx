import React from 'react';
import { Form, Icon, FormInputProps } from 'semantic-ui-react';

type InputProps = FormInputProps & {
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
        data-testid="datepicker-icon"
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
