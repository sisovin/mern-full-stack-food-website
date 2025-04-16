import axiosInstance from './axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    const { setUser } = useContext(AuthContext);
    setUser(response.data.user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', { email, password });
    localStorage.setItem('token', response.data.token);
    const { setUser } = useContext(AuthContext);
    setUser(response.data.user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  const { setUser } = useContext(AuthContext);
  setUser(null);
};
