import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
  blog: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
