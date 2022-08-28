import * as mongoose from 'mongoose';
export const ORDER_MODEL = 'orders';
export const OrdersSchema = new mongoose.Schema(
  {
    products: [mongoose.Schema.Types.ObjectId],
    userId: mongoose.Schema.Types.ObjectId,
    processing: { type: Boolean, default: true },
    payment: String,
    price: Number,
  },
  { timestamps: true, versionKey: false },
);
export interface orderModel {
  _id: mongoose.Types.ObjectId;
  products: [mongoose.Types.ObjectId];
  price: number;
  userId: mongoose.Types.ObjectId;
  paymentProcessed: boolean;
  paymentInfo: string;
  processing: boolean;
}
