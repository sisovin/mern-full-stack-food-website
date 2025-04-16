import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import nock from 'nock';

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

  test('mocks API call for card component', async () => {
    nock('http://localhost:3000')
      .get('/api/card-data')
      .reply(200, {
        title: 'Mock Title',
        content: 'Mock Content',
        image: 'mock.jpg',
      });

    const { getByText, getByAltText } = render(<Card title="Mock Title" content="Mock Content" image="mock.jpg" />);
    const titleElement = getByText(/Mock Title/i);
    const contentElement = getByText(/Mock Content/i);
    const imageElement = getByAltText(/Mock Title/i);

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
