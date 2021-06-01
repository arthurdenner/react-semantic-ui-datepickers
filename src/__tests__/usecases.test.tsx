import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import subDays from 'date-fns/subDays';
import tk from 'timekeeper';
import { getShortDate } from '../utils';
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

it('navigation with keyboard is possible', () => {
  const frozenDate = new Date('2021-01-24');

  tk.freeze(frozenDate);

  const now = new Date();
  const today = getShortDate(now)!;
  const yesterday = getShortDate(subDays(now, 1))!;
  const eightDaysAgo = getShortDate(subDays(now, 8))!;
  const sevenDaysAgo = getShortDate(subDays(now, 7))!;
  const { getByTestId } = setup({
    autoFocus: true,
    date: frozenDate,
    keepOpenOnSelect: true,
    showOutsideDays: true,
  });

  const todayCell = getByTestId(RegExp(today));

  fireEvent.click(todayCell);
  expect(todayCell).toHaveFocus();

  fireEvent.keyDown(document.activeElement!, { keyCode: 37 });
  expect(getByTestId(RegExp(yesterday))).toHaveFocus();

  fireEvent.keyDown(document.activeElement!, { keyCode: 38 });
  expect(getByTestId(RegExp(eightDaysAgo))).toHaveFocus();

  fireEvent.keyDown(document.activeElement!, { keyCode: 39 });
  expect(getByTestId(RegExp(sevenDaysAgo))).toHaveFocus();

  fireEvent.keyDown(document.activeElement!, { keyCode: 40 });
  expect(todayCell).toHaveFocus();

  tk.reset();
});
