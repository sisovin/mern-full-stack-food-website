import React from 'react';
import { render } from '@testing-library/react';
import BookTable from './BookTable';
import nock from 'nock';

describe('BookTable', () => {
  test('renders BookingForm component', () => {
    const { getByText } = render(<BookTable />);
    expect(getByText(/submit/i)).toBeInTheDocument();
  });

  test('mocks API call for book table page', async () => {
    nock('http://localhost:3000')
      .get('/api/bookings')
      .reply(200, {
        data: [
          {
            date: '2023-04-15',
            time: '18:00',
            partySize: 4,
          },
        ],
      });

    const { getByText } = render(<BookTable />);
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
});
