import { getUserById, updateUser, deleteUser } from '../services/userService';

export const getUser = (req: Request, res: Response, next: NextFunction): void => {
  // Your existing implementation with res.json() or similar but don't return it
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await updateUser(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export { getUser, updateUser, deleteUser };
