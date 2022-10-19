import React from 'react';
import {
  Form,
  Input,
  FormInputProps,
  FormFieldProps,
  Ref,
} from 'semantic-ui-react';
import { SemanticDatepickerProps } from '../types';
import CustomIcon from './icon';

type InputProps = FormInputProps & {
  clearIcon: SemanticDatepickerProps['clearIcon'];
  icon: SemanticDatepickerProps['icon'];
  isClearIconVisible: boolean;
  fieldProps: FormFieldProps;
  fieldRef: React.Ref<HTMLElement>;
  children?: React.ReactNode;
};

const inputData = {
  'data-testid': 'datepicker-input',
};

const style: React.CSSProperties = {
  position: 'relative',
};

const CustomInput = React.forwardRef<Input, InputProps>((props, ref) => {
  const {
    clearIcon,
    error,
    icon,
    isClearIconVisible,
    label,
    onClear,
    onFocus,
    required,
    value,
    fieldProps,
    fieldRef,
    children,
    ...rest
  } = props;

  return (
    <Ref innerRef={fieldRef}>
      <Form.Field {...fieldProps} style={style}>
        {label && (
          <label htmlFor={rest.id as string | undefined}>{label}</label>
        )}
        <Input
          {...rest}
          ref={ref}
          error={error}
          required={required}
          icon={
            <CustomIcon
              clearIcon={clearIcon}
              icon={icon}
              isClearIconVisible={isClearIconVisible}
              onClear={onClear}
            />
          }
          input={inputData}
          onFocus={onFocus}
          value={value}
        />
        {children}
      </Form.Field>
    </Ref>
  );
});

export default CustomInput;
