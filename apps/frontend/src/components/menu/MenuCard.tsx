import React from 'react';

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, description, price, imageUrl }) => {
  return (
    <div className="menu-card">
      <img src={imageUrl} alt={name} className="menu-card-image" />
      <div className="menu-card-content">
        <h3 className="menu-card-title">{name}</h3>
        <p className="menu-card-description">{description}</p>
        <p className="menu-card-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MenuCard;
