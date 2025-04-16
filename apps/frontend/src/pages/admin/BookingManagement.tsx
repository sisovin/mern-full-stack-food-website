import React, { useState, useEffect } from 'react';
import { getAllBookings, deleteBooking, createBooking, updateBooking } from '../../api/booking.api';

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ customerName: '', date: '', time: '', numberOfGuests: 0 });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      setBookings(response);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createBooking(newBooking);
      setNewBooking({ customerName: '', date: '', time: '', numberOfGuests: 0 });
      fetchBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const handleUpdate = async (bookingId: string, updatedData: any) => {
    try {
      await updateBooking(bookingId, updatedData);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <div className="booking-management">
      <h1>Manage Bookings</h1>
      <div className="booking-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={newBooking.customerName}
          onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
          value={newBooking.date}
          onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
        />
        <input
          type="time"
          placeholder="Time"
          value={newBooking.time}
          onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
        />
        <input
          type="number"
          placeholder="Number of Guests"
          value={newBooking.numberOfGuests}
          onChange={(e) => setNewBooking({ ...newBooking, numberOfGuests: parseInt(e.target.value) })}
        />
        <button onClick={handleCreate}>Add Booking</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Number of Guests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.customerName}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.numberOfGuests}</td>
              <td>
                <button onClick={() => handleDelete(booking._id)}>Delete</button>
                <button onClick={() => handleUpdate(booking._id, { customerName: 'Updated Name' })}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
