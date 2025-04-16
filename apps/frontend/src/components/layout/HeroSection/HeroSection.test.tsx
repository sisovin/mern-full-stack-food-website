import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection component', () => {
  test('renders HeroSection component', () => {
    render(<HeroSection />);
    const headingElement = screen.getByText(/Welcome to Our Restaurant/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders subheading', () => {
    render(<HeroSection />);
    const subheadingElement = screen.getByText(/Experience the best dining experience with us/i);
    expect(subheadingElement).toBeInTheDocument();
  });

  test('renders call-to-action button', () => {
    render(<HeroSection />);
    const buttonElement = screen.getByText(/Book a Table/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
