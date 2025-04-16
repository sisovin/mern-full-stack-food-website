import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="yyyy/MM/dd"
      className="date-picker"
    />
  );
};

export default DatePicker;
