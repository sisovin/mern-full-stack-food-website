import Booking from '../models/Booking';

const getAllBookings = async () => {
  const bookings = await Booking.find();
  return bookings;
};

const getBookingById = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

const createBooking = async (bookingData: any) => {
  const newBooking = new Booking(bookingData);
  await newBooking.save();
  return newBooking;
};

const updateBooking = async (bookingId: string, updateData: any) => {
  const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });
  if (!updatedBooking) {
    throw new Error('Booking not found');
  }
  return updatedBooking;
};

const deleteBooking = async (bookingId: string) => {
  const deletedBooking = await Booking.findByIdAndDelete(bookingId);
  if (!deletedBooking) {
    throw new Error('Booking not found');
  }
  return deletedBooking;
};

export { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking };
