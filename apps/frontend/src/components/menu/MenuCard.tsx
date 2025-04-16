import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ id, name, description, price, imageUrl }) => {
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    const item = { id, name, price, quantity: 1 };
    addItem(item);
  };

  return (
    <div className="menu-card">
      <img src={imageUrl} alt={name} className="menu-card-image" />
      <div className="menu-card-content">
        <h3 className="menu-card-title">{name}</h3>
        <p className="menu-card-description">{description}</p>
        <p className="menu-card-price">${price.toFixed(2)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default MenuCard;
