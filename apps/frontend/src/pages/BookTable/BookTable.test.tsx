import React from 'react';
import { render } from '@testing-library/react';
import BookTable from './BookTable';

describe('BookTable', () => {
  test('renders BookingForm component', () => {
    const { getByText } = render(<BookTable />);
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
});
