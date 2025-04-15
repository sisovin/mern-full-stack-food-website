import axiosInstance from './axios';

export const fetchMenuItems = async () => {
  try {
    const response = await axiosInstance.get('/menu/items');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMenuCategories = async () => {
  try {
    const response = await axiosInstance.get('/menu/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};
