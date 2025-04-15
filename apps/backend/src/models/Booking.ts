import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  date: Date;
  time: string;
  partySize: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    partySize: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
