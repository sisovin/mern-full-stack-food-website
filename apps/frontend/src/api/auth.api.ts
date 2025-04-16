import axiosInstance from './axios';

export const login = async (email: string, password: string, setUser: (user: any) => void) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (email: string, password: string, setUser: (user: any) => void) => {
  try {
    const response = await axiosInstance.post('/auth/register', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = (setUser: (user: any) => void) => {
  localStorage.removeItem('token');
  setUser(null);
};
