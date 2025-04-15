import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  test('renders Card component', () => {
    render(<Card title="Test Title" content="Test Content" image="test.jpg" />);
    const titleElement = screen.getByText(/Test Title/i);
    const contentElement = screen.getByText(/Test Content/i);
    const imageElement = screen.getByAltText(/Test Title/i);

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  test('renders props correctly', () => {
    render(<Card title="Another Title" content="Another Content" image="another.jpg" />);
    const titleElement = screen.getByText(/Another Title/i);
    const contentElement = screen.getByText(/Another Content/i);
    const imageElement = screen.getByAltText(/Another Title/i);

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
