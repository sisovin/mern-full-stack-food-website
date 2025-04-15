import { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } from './bookingService';
import Booking from '../models/Booking';

jest.mock('../models/Booking');

describe('Booking Service', () => {
  describe('getAllBookings', () => {
    it('should return all bookings', async () => {
      const mockBookings = [{ _id: '1', customerName: 'John Doe' }, { _id: '2', customerName: 'Jane Doe' }];
      (Booking.find as jest.Mock).mockResolvedValue(mockBookings);

      const result = await getAllBookings();

      expect(result).toEqual(mockBookings);
      expect(Booking.find).toHaveBeenCalled();
    });
  });

  describe('getBookingById', () => {
    it('should return a booking by ID', async () => {
      const mockBooking = { _id: '1', customerName: 'John Doe' };
      (Booking.findById as jest.Mock).mockResolvedValue(mockBooking);

      const result = await getBookingById('1');

      expect(result).toEqual(mockBooking);
      expect(Booking.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if booking not found', async () => {
      (Booking.findById as jest.Mock).mockResolvedValue(null);

      await expect(getBookingById('1')).rejects.toThrow('Booking not found');
    });
  });

  describe('createBooking', () => {
    it('should create a new booking', async () => {
      const mockBookingData = { customerName: 'John Doe', date: '2023-05-01', time: '18:00', numberOfGuests: 4 };
      const mockBooking = { _id: '1', ...mockBookingData };
      (Booking.prototype.save as jest.Mock).mockResolvedValue(mockBooking);

      const result = await createBooking(mockBookingData);

      expect(result).toEqual(mockBooking);
      expect(Booking.prototype.save).toHaveBeenCalled();
    });
  });

  describe('updateBooking', () => {
    it('should update a booking', async () => {
      const mockBookingData = { customerName: 'Jane Doe' };
      const mockBooking = { _id: '1', ...mockBookingData };
      (Booking.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockBooking);

      const result = await updateBooking('1', mockBookingData);

      expect(result).toEqual(mockBooking);
      expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith('1', mockBookingData, { new: true });
    });

    it('should throw an error if booking not found', async () => {
      (Booking.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(updateBooking('1', { customerName: 'Jane Doe' })).rejects.toThrow('Booking not found');
    });
  });

  describe('deleteBooking', () => {
    it('should delete a booking', async () => {
      const mockBooking = { _id: '1', customerName: 'John Doe' };
      (Booking.findByIdAndDelete as jest.Mock).mockResolvedValue(mockBooking);

      const result = await deleteBooking('1');

      expect(result).toEqual(mockBooking);
      expect(Booking.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if booking not found', async () => {
      (Booking.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(deleteBooking('1')).rejects.toThrow('Booking not found');
    });
  });
});
