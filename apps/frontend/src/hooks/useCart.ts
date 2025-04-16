import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { cart, addItem, removeItem, clearCart } = useContext(CartContext);
  return { cart, addItem, removeItem, clearCart };
};

export default useCart;
