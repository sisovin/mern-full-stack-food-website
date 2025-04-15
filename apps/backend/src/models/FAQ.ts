import mongoose, { Schema, Document } from 'mongoose';

interface IFAQ extends Document {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const FAQ = mongoose.model<IFAQ>('FAQ', FAQSchema);

export default FAQ;
