import { useState, useEffect } from 'react';
import { fetchMenuItems, fetchMenuCategories } from '../api/menu.api';

const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return { menuItems, menuCategories, loading };
};

export default useMenu;
