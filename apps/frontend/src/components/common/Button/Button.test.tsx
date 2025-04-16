import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import nock from 'nock';

describe('Button component', () => {
  test('renders Button component', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick event handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('mocks API call for button click', async () => {
    nock('http://localhost:3000')
      .post('/api/button-click')
      .reply(200, {
        message: 'Button clicked successfully',
      });

    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
