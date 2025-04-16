import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuCard from './MenuCard';

describe('MenuCard component', () => {
  test('renders MenuCard component', () => {
    render(<MenuCard name="Test Item" description="Test Description" price={9.99} imageUrl="test.jpg" />);
    const nameElement = screen.getByText(/Test Item/i);
    const descriptionElement = screen.getByText(/Test Description/i);
    const priceElement = screen.getByText(/\$9.99/i);
    const imageElement = screen.getByAltText(/Test Item/i);

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  test('renders props correctly', () => {
    render(<MenuCard name="Another Item" description="Another Description" price={19.99} imageUrl="another.jpg" />);
    const nameElement = screen.getByText(/Another Item/i);
    const descriptionElement = screen.getByText(/Another Description/i);
    const priceElement = screen.getByText(/\$19.99/i);
    const imageElement = screen.getByAltText(/Another Item/i);

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
