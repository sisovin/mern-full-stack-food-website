import { useState, useEffect } from 'react';
import { createBooking, updateBooking, deleteBooking, getAllBookings, getBookingById } from '../api/booking.api';

const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await getAllBookings();
        setBookings(allBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const createNewBooking = async (bookingData) => {
    try {
      const newBooking = await createBooking(bookingData);
      setBookings((prevBookings) => [...prevBookings, newBooking]);
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  const updateExistingBooking = async (bookingId, updateData) => {
    try {
      const updatedBooking = await updateBooking(bookingId, updateData);
      setBookings((prevBookings) =>
        prevBookings.map((booking) => (booking._id === bookingId ? updatedBooking : booking))
      );
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const deleteExistingBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const fetchBookingById = async (bookingId) => {
    try {
      const booking = await getBookingById(bookingId);
      setBooking(booking);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
    }
  };

  return { bookings, booking, loading, createNewBooking, updateExistingBooking, deleteExistingBooking, fetchBookingById };
};

export default useBooking;
