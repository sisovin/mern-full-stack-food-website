import { registerUser, loginUser, refreshToken, logoutUser } from '../services/authService';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await registerUser(username, email, password);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const newToken = await refreshToken(token);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    await logoutUser(userId);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { register, login, refreshToken, logout };
