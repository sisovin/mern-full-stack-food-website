import Menu from '../models/Menu';

const getAllMenuItems = async () => {
  const menuItems = await Menu.find();
  return menuItems;
};

const getMenuItemById = async (menuItemId: string) => {
  const menuItem = await Menu.findById(menuItemId);
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  return menuItem;
};

const createMenuItem = async (menuItemData: any) => {
  const newMenuItem = new Menu(menuItemData);
  await newMenuItem.save();
  return newMenuItem;
};

const updateMenuItem = async (menuItemId: string, updateData: any) => {
  const updatedMenuItem = await Menu.findByIdAndUpdate(menuItemId, updateData, { new: true });
  if (!updatedMenuItem) {
    throw new Error('Menu item not found');
  }
  return updatedMenuItem;
};

const deleteMenuItem = async (menuItemId: string) => {
  const deletedMenuItem = await Menu.findByIdAndDelete(menuItemId);
  if (!deletedMenuItem) {
    throw new Error('Menu item not found');
  }
  return deletedMenuItem;
};

export { getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem };
