import React, { useState } from 'react';
import DatePicker from './DatePicker';
import useBooking from '../../hooks/useBooking';

const BookingForm: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(1);
  const { createNewBooking } = useBooking();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (date && time && partySize) {
      const bookingData = { date, time, partySize };
      try {
        await createNewBooking(bookingData);
        alert('Booking created successfully!');
      } catch (error) {
        alert('Failed to create booking.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <DatePicker selectedDate={date} onDateChange={setDate} />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="partySize">Party Size:</label>
        <input
          type="number"
          id="partySize"
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
