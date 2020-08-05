import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SemanticDatepickerProps } from '../types';
import DatePicker from '../';

export const setup = (props: Partial<SemanticDatepickerProps> = {}) => {
  const options = render(<DatePicker onChange={jest.fn()} {...props} />);
  const getQuery = props.inline ? options.queryByTestId : options.getByTestId;
  const getIcon = () => options.getByTestId('datepicker-icon');

  return {
    ...options,
    getIcon,
    openDatePicker: () => fireEvent.click(getIcon()),
    rerender: (newProps?: Partial<SemanticDatepickerProps>) =>
      options.rerender(
        <DatePicker onChange={jest.fn()} {...props} {...newProps} />
      ),
    datePickerInput: getQuery('datepicker-input')
      ?.firstChild as HTMLInputElement,
  };
};
