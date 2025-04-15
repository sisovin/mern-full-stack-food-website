import { registerUser, loginUser, refreshToken, logoutUser } from '../services/authService';
import { successResponse, errorResponse } from '../utils/responseHandler';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await registerUser(username, email, password);
    successResponse(res, { user, token }, 'User registered successfully', 201);
  } catch (error) {
    errorResponse(res, error, 'User registration failed', 400);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    successResponse(res, { user, token }, 'User logged in successfully');
  } catch (error) {
    errorResponse(res, error, 'User login failed', 400);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const newToken = await refreshToken(token);
    successResponse(res, { token: newToken }, 'Token refreshed successfully');
  } catch (error) {
    errorResponse(res, error, 'Token refresh failed', 400);
  }
};

const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    await logoutUser(userId);
    successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    errorResponse(res, error, 'Logout failed', 400);
  }
};

export { register, login, refreshToken, logout };
