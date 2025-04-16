import React from 'react';
import HeroSection from '../../components/layout/HeroSection/HeroSection';
import MenuFilter from '../../components/menu/MenuFilter';
import useMenu from '../../hooks/useMenu';

const Home: React.FC = () => {
  const { menuCategories, selectedCategory, setSelectedCategory } = useMenu();

  return (
    <div>
      <HeroSection />
      <MenuFilter
        categories={menuCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {/* Additional sections for the home page can be added here */}
    </div>
  );
};

export default Home;
