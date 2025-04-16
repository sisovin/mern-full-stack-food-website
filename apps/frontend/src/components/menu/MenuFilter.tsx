import React from 'react';

interface MenuFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const MenuFilter: React.FC<MenuFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="menu-filter">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="menu-filter-select"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MenuFilter;
