import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page component', () => {
  test('renders HeroSection component', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Welcome to Our Restaurant/i);
    expect(headingElement).toBeInTheDocument();
  });

  // Add more tests for additional sections of the home page as needed
});
