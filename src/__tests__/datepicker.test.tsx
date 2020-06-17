import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SemanticDatepickerProps } from '../types';
import localeEn from '../locales/en-US.json';
import localePt from '../locales/pt-BR.json';
import { getShortDate } from '../utils';
import DatePicker from '../';

const setup = (props: Partial<SemanticDatepickerProps> = {}) => {
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
const onBlur = jest.fn();
let spy: jest.SpyInstance;

beforeEach(() => {
  spy = jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  onBlur.mockRestore();
  spy.mockRestore();
});

describe('Basic datepicker', () => {
  describe('reacts to keyboard events', () => {
    it('closes datepicker on Esc', async () => {
      const { getByText, openDatePicker, queryByText } = setup({ onBlur });
      openDatePicker();

      expect(getByText('Today')).toBeDefined();
      fireEvent.keyDown(getByText('Today'), { keyCode: 27 });
      expect(queryByText('Today')).toBeNull();
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('ignore keys different from Enter', async () => {
      const { datePickerInput } = setup({ onBlur });
      fireEvent.keyDown(datePickerInput);

      expect(onBlur).not.toHaveBeenCalled();
    });

    it('only return if Enter is pressed without any value', async () => {
      const { datePickerInput } = setup({ onBlur });
      fireEvent.keyDown(datePickerInput, { keyCode: 13 });

      expect(datePickerInput.value).toBe('');
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('accepts valid input followed by Enter key', async () => {
      const { datePickerInput } = setup({ onBlur });
      fireEvent.input(datePickerInput, { target: { value: '2020-02-02' } });
      fireEvent.keyDown(datePickerInput, { keyCode: 13 });

      expect(datePickerInput.value).toBe('2020-02-02');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith(undefined);
    });

    it("doesn't accept invalid input followed by Enter key", async () => {
      const { datePickerInput } = setup({ onBlur });
      fireEvent.input(datePickerInput, { target: { value: '2020-02' } });
      fireEvent.keyDown(datePickerInput, { keyCode: 13 });

      expect(datePickerInput.value).toBe('');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith(undefined);
    });
  });

  describe('without readOnly or datePickerOnly', () => {
    it('accepts input', async () => {
      const { datePickerInput } = setup();
      fireEvent.input(datePickerInput, { target: { value: 'a2b3' } });

      expect(datePickerInput.value).toBe('a2b3');
    });

    it("doesn't accept letters on input with allowOnlyNumbers", async () => {
      const { datePickerInput } = setup({ allowOnlyNumbers: true });
      fireEvent.input(datePickerInput, { target: { value: 'a2b3c' } });

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

  describe('with autoComplete', () => {
    it("it's empty by default", async () => {
      const { datePickerInput } = setup();

      expect(datePickerInput.autocomplete).toBe('');
    });

    it("it's passed down, if provided", async () => {
      const { datePickerInput } = setup({ autoComplete: 'off' });

      expect(datePickerInput.autocomplete).toBe('off');
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

  it('updates datepicker value if value prop updates', async () => {
    const now = new Date();
    const today = new Date(now.getTime());
    const tomorrow = new Date(now.setDate(now.getDate() + 1));
    const { datePickerInput, rerender } = setup({ value: today });

    expect(datePickerInput.value).toBe(getShortDate(today));

    rerender({ value: tomorrow });

    expect(datePickerInput.value).toBe(getShortDate(tomorrow));
  });

  it('reset its state on clear', () => {
    const { datePickerInput, getByTestId, getByText, openDatePicker } = setup();

    openDatePicker();
    fireEvent.click(getByText('Today'));

    expect(datePickerInput.value).not.toBe('');

    fireEvent.click(getByTestId('datepicker-icon'));

    expect(datePickerInput.value).toBe('');
  });

  it('should be accessible when id is provided', () => {
    const { getByLabelText, getByText } = setup({
      id: 'click-me',
      label: 'Click me',
    });

    fireEvent.click(getByLabelText('Click me'));
    expect(getByText('Today')).toBeTruthy();
  });

  describe('clearOnSameDateClick', () => {
    it('reset its state when prop is true', () => {
      const { datePickerInput, getByText, openDatePicker } = setup({
        keepOpenOnSelect: true,
        onBlur,
      });

      openDatePicker();
      fireEvent.click(getByText('Today'));
      expect(datePickerInput.value).not.toBe('');
      fireEvent.click(getByText('Today'));
      expect(datePickerInput.value).toBe('');
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it("doesn't reset its state when prop is false", () => {
      const { datePickerInput, getByText, openDatePicker } = setup({
        clearOnSameDateClick: false,
        keepOpenOnSelect: true,
        onBlur,
      });

      openDatePicker();
      fireEvent.click(getByText('Today'));
      expect(datePickerInput.value).not.toBe('');
      fireEvent.click(getByText('Today'));
      expect(datePickerInput.value).not.toBe('');
      expect(onBlur).not.toHaveBeenCalled();
    });
  });

  describe('placeholder', () => {
    it('should use the format prop as default', () => {
      const { datePickerInput } = setup();

      expect(datePickerInput.placeholder).toBe('YYYY-MM-DD');
    });

    it('should allow empty strings', () => {
      const { datePickerInput } = setup({ placeholder: '' });

      expect(datePickerInput.placeholder).toBe('');
    });

    it('should allow null', () => {
      const { datePickerInput } = setup({ placeholder: null });

      expect(datePickerInput.placeholder).toBe('');
    });
  });
});

describe('Range datepicker', () => {
  describe('reacts to keyboard events', () => {
    it('accepts valid input followed by Enter key', async () => {
      const { datePickerInput } = setup({ onBlur, type: 'range' });
      fireEvent.input(datePickerInput, { target: { value: '2020-02-02' } });
      fireEvent.keyDown(datePickerInput, { keyCode: 13 });

      expect(datePickerInput.value).toBe('2020-02-02');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith(undefined);
    });

    it("doesn't accept invalid input followed by Enter key", async () => {
      const { datePickerInput } = setup({ onBlur, type: 'range' });
      fireEvent.input(datePickerInput, { target: { value: '2020-02' } });
      fireEvent.keyDown(datePickerInput, { keyCode: 13 });

      expect(datePickerInput.value).toBe('');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith(undefined);
    });
  });

  it('fires onBlur prop when selecting both dates', async () => {
    const onChange = jest.fn();
    const now = new Date();
    const today = getShortDate(now) as string;
    const tomorrow = getShortDate(
      new Date(now.setDate(now.getDate() + 1))
    ) as string;
    const { getByTestId, openDatePicker } = setup({
      onBlur,
      onChange,
      type: 'range',
    });

    openDatePicker();
    const todayCell = getByTestId(RegExp(today));
    const tomorrowCell = getByTestId(RegExp(tomorrow));

    fireEvent.click(todayCell);
    expect(onBlur).toHaveBeenCalledTimes(0);

    fireEvent.click(tomorrowCell);
    expect(onBlur).toHaveBeenCalledTimes(1);
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

  it('reset its state on clear', () => {
    const { datePickerInput, getByTestId, getByText, openDatePicker } = setup({
      type: 'range',
    });

    openDatePicker();
    fireEvent.click(getByText('Today'));

    expect(datePickerInput.value).not.toBe('');

    fireEvent.click(getByTestId('datepicker-icon'));

    expect(datePickerInput.value).toBe('');
  });
});

describe('Inline datepicker', () => {
  it('should not display the input when inline prop is true', () => {
    const { queryByTestId } = setup({ inline: true });

    expect(queryByTestId('datepicker-input')).toBeFalsy();
  });

  describe('basic variant', () => {
    it('fires onChange with event and selected date as arguments', async () => {
      const onChange = jest.fn();
      const today = getShortDate(new Date()) as string;
      const { getByTestId } = setup({ inline: true, onChange });
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

  describe('range variant', () => {
    it('fires onChange with event and selected dates as arguments', async () => {
      const onChange = jest.fn();
      const now = new Date();
      const today = getShortDate(now) as string;
      const tomorrow = getShortDate(
        new Date(now.setDate(now.getDate() + 1))
      ) as string;
      const { getByTestId } = setup({ onChange, inline: true, type: 'range' });
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

  describe('Custom icons', () => {
    it('should allow for custom Semantic UI icons', () => {
      const icon = 'search';
      const { getIcon } = setup({ icon });

      expect(getIcon()).toHaveClass(icon, 'icon');
    });

    it('should allow for custom icon components', () => {
      const { getIcon } = setup({ icon: <span>Custom icon</span> });

      expect(getIcon().textContent).toBe('Custom icon');
    });

    it('should allow for custom clear Semantic UI icons', () => {
      const clearIcon = 'ban';
      const { getByText, getIcon, openDatePicker } = setup({ clearIcon });

      openDatePicker();
      fireEvent.click(getByText('Today'));

      expect(getIcon()).toHaveClass(clearIcon, 'icon');
    });

    it('should allow for custom clear icon components', () => {
      const customClearIcon = <span>Custom icon</span>;
      const { getByText, getIcon, openDatePicker } = setup({
        clearIcon: customClearIcon,
      });

      openDatePicker();
      fireEvent.click(getByText('Today'));

      expect(getIcon().textContent).toBe('Custom icon');
    });
  });
});
