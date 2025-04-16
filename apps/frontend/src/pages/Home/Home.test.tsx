import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import nock from 'nock';

describe('Home page component', () => {
  test('renders HeroSection component', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Welcome to Our Restaurant/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('mocks API call for home page', async () => {
    nock('http://localhost:3000')
      .get('/api/home-data')
      .reply(200, {
        data: 'Mock Home Data',
      });

    render(<Home />);
    const headingElement = screen.getByText(/Welcome to Our Restaurant/i);
    expect(headingElement).toBeInTheDocument();
  });

  // Add more tests for additional sections of the home page as needed
});
