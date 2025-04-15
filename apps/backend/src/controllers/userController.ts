import { getUserById, updateUser, deleteUser } from '../services/userService';

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await updateUser(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getUser, updateUser, deleteUser };
