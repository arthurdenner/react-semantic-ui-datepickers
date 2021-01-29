import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setup } from './_utils';

it('onChange is fired when invalid date is typed', () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const { datePickerInput, openDatePicker } = setup({ onBlur, onChange });

  openDatePicker();
  fireEvent.click(screen.getByText('Today'));

  expect(datePickerInput).toHaveFocus();
  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledTimes(1);

  userEvent.type(datePickerInput, '{backspace}');
  userEvent.type(datePickerInput, '{backspace}');
  fireEvent.keyDown(datePickerInput, { keyCode: 13 });

  expect(datePickerInput.value).toBe('');
  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledTimes(2);
});

it('onFocus is fired when input is focused', () => {
  const onFocus = jest.fn();
  const { datePickerInput, openDatePicker } = setup({ onFocus });

  openDatePicker();

  expect(datePickerInput).toHaveFocus();
  expect(onFocus).toHaveBeenCalled();
});
