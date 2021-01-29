import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SemanticDatepickerProps } from '../types';
import DatePicker from '../';

export const setup = (props: Partial<SemanticDatepickerProps> = {}) => {
  const options = render(<DatePicker onChange={jest.fn()} {...props} />);
  const getQuery = props.inline ? options.queryByTestId : options.getByTestId;
  const getClearIcon = () => options.getByTestId('datepicker-clear-icon');
  const getIcon = () => options.getByTestId('datepicker-icon');
  const datePickerInput = getQuery('datepicker-input') as HTMLInputElement;

  return {
    ...options,
    datePickerInput,
    getClearIcon,
    getIcon,
    openDatePicker: () => fireEvent.focus(datePickerInput),
    rerender: (newProps?: Partial<SemanticDatepickerProps>) =>
      options.rerender(
        <DatePicker onChange={jest.fn()} {...props} {...newProps} />
      ),
  };
};
