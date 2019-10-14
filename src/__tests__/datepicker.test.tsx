import React from 'react';
import { render } from '@testing-library/react';
import DatePicker from '../';

describe('Basic datepicker', () => {
  it('renders', () => {
    const onDateChange = jest.fn();

    expect(render(<DatePicker onDateChange={onDateChange} />)).toBeTruthy();
  });
});

describe('Range datepicker', () => {
  it('renders', () => {
    const onDateChange = jest.fn();

    expect(
      render(<DatePicker onDateChange={onDateChange} type="range" />)
    ).toBeTruthy();
  });
});
