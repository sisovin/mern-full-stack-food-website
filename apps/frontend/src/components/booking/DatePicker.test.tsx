import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';
import nock from 'nock';

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

  test('mocks API call for date picker', async () => {
    nock('http://localhost:3000')
      .get('/api/booking/available-dates')
      .reply(200, {
        availableDates: ['2023-04-15', '2023-04-16', '2023-04-17'],
      });

    const handleDateChange = jest.fn();
    const { getByRole } = render(<DatePicker selectedDate={null} onDateChange={handleDateChange} />);
    const datePickerInput = getByRole('textbox');

    fireEvent.change(datePickerInput, { target: { value: '2023-04-15' } });

    expect(handleDateChange).toHaveBeenCalledWith(new Date('2023-04-15'));
  });
});
