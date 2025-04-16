import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  test('renders date picker input', () => {
    const { getByRole } = render(<DatePicker selectedDate={null} onDateChange={() => {}} />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  test('calls onDateChange when a date is selected', () => {
    const handleDateChange = jest.fn();
    const { getByRole } = render(<DatePicker selectedDate={null} onDateChange={handleDateChange} />);
    const datePickerInput = getByRole('textbox');

    fireEvent.change(datePickerInput, { target: { value: '2023-04-15' } });

    expect(handleDateChange).toHaveBeenCalledWith(new Date('2023-04-15'));
  });
});
