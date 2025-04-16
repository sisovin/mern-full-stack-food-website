import React, { useState, useEffect } from 'react';
import { getMenuItems, deleteMenuItem, createMenuItem, updateMenuItem } from '../../api/menu.api';

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await getMenuItems();
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleDelete = async (menuItemId: string) => {
    try {
      await deleteMenuItem(menuItemId);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createMenuItem(newMenuItem);
      setNewMenuItem({ name: '', description: '', price: 0 });
      fetchMenuItems();
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  const handleUpdate = async (menuItemId: string, updatedData: any) => {
    try {
      await updateMenuItem(menuItemId, updatedData);
      fetchMenuItems();
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  return (
    <div className="menu-management">
      <h1>Manage Menu</h1>
      <div className="menu-form">
        <input
          type="text"
          placeholder="Name"
          value={newMenuItem.name}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, price: parseFloat(e.target.value) })}
        />
        <button onClick={handleCreate}>Add Menu Item</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem) => (
            <tr key={menuItem._id}>
              <td>{menuItem._id}</td>
              <td>{menuItem.name}</td>
              <td>{menuItem.description}</td>
              <td>{menuItem.price}</td>
              <td>
                <button onClick={() => handleDelete(menuItem._id)}>Delete</button>
                <button onClick={() => handleUpdate(menuItem._id, { name: 'Updated Name' })}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
