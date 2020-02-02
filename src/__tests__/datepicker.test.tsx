import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SemanticDatepickerProps } from '../types';
import localeEn from '../locales/en-US.json';
import localePt from '../locales/pt-BR.json';
import { getShortDate } from '../utils';
import DatePicker from '../';

const setup = (props?: Partial<SemanticDatepickerProps>) => {
  const options = render(<DatePicker onChange={jest.fn()} {...props} />);

  return {
    ...options,
    openDatePicker: () => {
      const icon = options.getByTestId('datepicker-icon');

      fireEvent.click(icon);
    },
    rerender: (newProps?: Partial<SemanticDatepickerProps>) =>
      options.rerender(
        <DatePicker onChange={jest.fn()} {...props} {...newProps} />
      ),
    datePickerInput: options.getByTestId('datepicker-input')
      .firstChild as HTMLInputElement,
  };
};
let spy: jest.SpyInstance;

beforeEach(() => {
  spy = jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  spy.mockRestore();
});

describe('Basic datepicker', () => {
  it('renders', () => {
    expect(setup()).toBeTruthy();
  });

  describe('without readOnly or datePickerOnly', () => {
    it('accepts input', async () => {
      const { datePickerInput } = setup();
      fireEvent.input(datePickerInput, { target: { value: '23' } });

      expect(datePickerInput.value).toBe('23');
    });

    it('opens date picker', async () => {
      const { getByTestId, openDatePicker } = setup();
      openDatePicker();

      expect(getByTestId('datepicker-today-button')).toBeDefined();
    });
  });

  describe('with readOnly', () => {
    it('does not accept input', async () => {
      const { datePickerInput } = setup({ readOnly: true });

      expect(datePickerInput.readOnly).toBeTruthy();
    });

    it('does not open date picker', async () => {
      const { queryByTestId, openDatePicker } = setup({ readOnly: true });
      openDatePicker();

      expect(queryByTestId('datepicker-today-button')).toBeNull();
    });
  });

  describe('with datePickerOnly', () => {
    it('does not accept input', async () => {
      const { getByTestId } = setup({ datePickerOnly: true });
      const datePickerInput = getByTestId('datepicker-input')
        .firstChild as HTMLInputElement;

      expect(datePickerInput.readOnly).toBeTruthy();
    });

    it('opens date picker', async () => {
      const { getByTestId, openDatePicker } = setup({ datePickerOnly: true });
      openDatePicker();

      expect(getByTestId('datepicker-today-button')).toBeDefined();
    });
  });

  it('updates the locale if the prop changes', async () => {
    const { getByTestId, openDatePicker, rerender } = setup();

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    rerender({ locale: 'pt-BR' });

    expect(todayButton.textContent).toBe(localePt.todayButton);
  });

  it('fallbacks the locale to `en-US` when it has invalid value', async () => {
    const { getByTestId, openDatePicker, rerender } = setup();

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    // @ts-ignore
    rerender({ locale: 'invalid' });

    expect(todayButton.textContent).toBe(localeEn.todayButton);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringMatching(/not a valid locale/)
    );
  });

  it('fires onChange with event and selected date as arguments', async () => {
    const onChange = jest.fn();
    const today = getShortDate(new Date()) as string;
    const { getByTestId, openDatePicker } = setup({ onChange });

    openDatePicker();

    const todayCell = getByTestId(RegExp(today));

    fireEvent.click(todayCell);

    expect(onChange).toHaveBeenNthCalledWith(
      1,
      expect.any(Object),
      expect.objectContaining({
        value: expect.any(Date),
      })
    );
  });
});

describe('Range datepicker', () => {
  it('renders', () => {
    expect(setup({ type: 'range' })).toBeTruthy();
  });

  it('updates the locale if the prop changes', async () => {
    const { getByTestId, openDatePicker, rerender } = setup({ type: 'range' });

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    rerender({ locale: 'pt-BR' });

    expect(todayButton.textContent).toBe(localePt.todayButton);
  });

  it('fallbacks the locale to `en-US` when it has invalid value', async () => {
    const { getByTestId, openDatePicker, rerender } = setup({ type: 'range' });

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    // @ts-ignore
    rerender({ locale: 'invalid' });

    expect(todayButton.textContent).toBe(localeEn.todayButton);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringMatching(/not a valid locale/)
    );
  });

  it('fires onChange with event and selected dates as arguments', async () => {
    const onChange = jest.fn();
    const now = new Date();
    const today = getShortDate(now) as string;
    const tomorrow = getShortDate(
      new Date(now.setDate(now.getDate() + 1))
    ) as string;
    const { getByTestId, openDatePicker } = setup({
      onChange,
      type: 'range',
    });

    openDatePicker();

    const todayCell = getByTestId(RegExp(today));
    const tomorrowCell = getByTestId(RegExp(tomorrow));

    fireEvent.click(todayCell);

    expect(onChange).toHaveBeenNthCalledWith(
      1,
      expect.any(Object),
      expect.objectContaining({
        value: [expect.any(Date)],
      })
    );

    fireEvent.click(tomorrowCell);

    expect(onChange).toHaveBeenNthCalledWith(
      2,
      expect.any(Object),
      expect.objectContaining({
        value: [expect.any(Date), expect.any(Date)],
      })
    );
  });
});
