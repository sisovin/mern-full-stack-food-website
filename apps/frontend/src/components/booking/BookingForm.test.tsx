import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import { createBooking } from '../../api/booking.api';

jest.mock('../../api/booking.api');

describe('BookingForm', () => {
  test('renders form fields correctly', () => {
    const { getByLabelText, getByText } = render(<BookingForm />);
    expect(getByLabelText(/date/i)).toBeInTheDocument();
    expect(getByLabelText(/time/i)).toBeInTheDocument();
    expect(getByLabelText(/party size/i)).toBeInTheDocument();
    expect(getByText(/submit/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const { getByLabelText, getByText } = render(<BookingForm />);
    const dateInput = getByLabelText(/date/i);
    const timeInput = getByLabelText(/time/i);
    const partySizeInput = getByLabelText(/party size/i);
    const submitButton = getByText(/submit/i);

    fireEvent.change(dateInput, { target: { value: '2023-04-15' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    fireEvent.change(partySizeInput, { target: { value: '4' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createBooking).toHaveBeenCalledWith({
        date: new Date('2023-04-15'),
        time: '18:00',
        partySize: 4,
      });
    });
  });

  test('shows error message for incomplete form', () => {
    const { getByText } = render(<BookingForm />);
    const submitButton = getByText(/submit/i);

    fireEvent.click(submitButton);

    expect(getByText(/please fill in all fields/i)).toBeInTheDocument();
  });
});
