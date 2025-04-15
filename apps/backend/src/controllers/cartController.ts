import { getCartByUserId, addItemToCart, removeItemFromCart, clearCart } from '../services/cartService';

const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    const updatedCart = await addItemToCart(userId, productId, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { productId } = req.body;
    const updatedCart = await removeItemFromCart(userId, productId);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    await clearCart(userId);
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getCart, addItem, removeItem, clearCart };
