import axiosInstance from './axios';

export const createBooking = async (bookingData: any) => {
  try {
    const response = await axiosInstance.post('/booking', bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBooking = async (bookingId: string, updateData: any) => {
  try {
    const response = await axiosInstance.put(`/booking/${bookingId}`, updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBooking = async (bookingId: string) => {
  try {
    const response = await axiosInstance.delete(`/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get('/booking');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingById = async (bookingId: string) => {
  try {
    const response = await axiosInstance.get(`/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
