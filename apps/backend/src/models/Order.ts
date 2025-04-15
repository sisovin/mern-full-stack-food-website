import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  {
    _id: false,
  }
);

const OrderSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [OrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
