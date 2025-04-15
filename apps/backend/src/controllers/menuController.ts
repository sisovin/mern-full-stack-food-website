import { getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } from '../services/menuService';

const getAllMenus = async (req, res) => {
  try {
    const menuItems = await getAllMenuItems();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const menuItem = await getMenuItemById(menuItemId);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createMenu = async (req, res) => {
  try {
    const menuItemData = req.body;
    const newMenuItem = await createMenuItem(menuItemData);
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updateData = req.body;
    const updatedMenuItem = await updateMenuItem(menuItemId, updateData);
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    await deleteMenuItem(menuItemId);
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAllMenus, getMenuById, createMenu, updateMenu, deleteMenu };
