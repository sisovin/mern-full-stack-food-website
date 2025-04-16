import { useState, useEffect } from 'react';
import { fetchMenuItems, fetchMenuCategories, fetchMenuItemsByCategory } from '../api/menu.api';

const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMenuItemsByCategory = async (category: string) => {
    try {
      const items = await fetchMenuItemsByCategory(category);
      setMenuItems(items);
    } catch (error) {
      console.error('Failed to fetch menu items by category:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchMenuItems();
        const categories = await fetchMenuCategories();
        setMenuItems(items);
        setMenuCategories(categories);
      } catch (error) {
        console.error('Failed to fetch menu data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchMenuItemsByCategory(selectedCategory);
    } else {
      fetchMenuItems();
    }
  }, [selectedCategory]);

  return { menuItems, menuCategories, selectedCategory, setSelectedCategory, loading };
};

export default useMenu;
