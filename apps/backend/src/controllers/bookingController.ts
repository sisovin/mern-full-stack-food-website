import { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } from '../services/bookingService';

const getAllBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await getBookingById(bookingId);
    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = await createBooking(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;
    const updatedBooking = await updateBooking(bookingId, updateData);
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    await deleteBooking(bookingId);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking };
