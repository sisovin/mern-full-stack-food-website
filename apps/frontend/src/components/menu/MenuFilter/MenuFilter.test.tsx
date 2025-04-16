import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuFilter from './MenuFilter';

describe('MenuFilter component', () => {
  const categories = ['Appetizers', 'Main Course', 'Desserts'];
  const selectedCategory = 'Main Course';
  const onCategoryChange = jest.fn();

  test('renders MenuFilter component', () => {
    render(
      <MenuFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  test('displays all categories in the select dropdown', () => {
    render(
      <MenuFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    );
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(categories.length + 1); // +1 for the "All" option
  });

  test('calls onCategoryChange when a category is selected', () => {
    render(
      <MenuFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    );
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Desserts' } });
    expect(onCategoryChange).toHaveBeenCalledWith('Desserts');
  });
});
