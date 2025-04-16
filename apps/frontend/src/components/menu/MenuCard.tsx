import React from 'react';
import useCart from '../../hooks/useCart';
import useMenu from '../../hooks/useMenu';
import styles from './MenuCard.module.css';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ id, name, description, price, imageUrl }) => {
  const { addItem } = useCart();
  const { menuItems, loading } = useMenu();

  const handleAddToCart = () => {
    const item = { id, name, price, quantity: 1 };
    addItem(item);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['menu-card']}>
      <img src={imageUrl} alt={name} className={styles['menu-card-image']} />
      <div className={styles['menu-card-content']}>
        <h3 className={styles['menu-card-title']}>{name}</h3>
        <p className={styles['menu-card-description']}>{description}</p>
        <p className={styles['menu-card-price']}>${price.toFixed(2)}</p>
        <button className={styles['menu-card-button']} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default MenuCard;
