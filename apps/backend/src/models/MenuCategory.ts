import mongoose, { Schema, Document } from 'mongoose';

interface IMenuCategory extends Document {
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuCategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const MenuCategory = mongoose.model<IMenuCategory>('MenuCategory', MenuCategorySchema);

export default MenuCategory;
