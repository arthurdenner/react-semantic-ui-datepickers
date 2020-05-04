import React from 'react';
import { Form, Icon, Input, FormInputProps } from 'semantic-ui-react';

type InputProps = FormInputProps & {
  isClearIconVisible: boolean;
};

const CustomInput = React.forwardRef<Input, InputProps>((props, ref) => {
  const {
    icon,
    isClearIconVisible,
    label,
    onClear,
    onClick,
    value,
    ...rest
  } = props;

  return (
    <Form.Field>
      {label && <label>{label}</label>}
      <Input
        data-testid="datepicker-input"
        {...rest}
        ref={ref}
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
    </Form.Field>
  );
});

CustomInput.defaultProps = {
  icon: 'calendar',
};

export default CustomInput;
