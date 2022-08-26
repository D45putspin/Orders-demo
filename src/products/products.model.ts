import * as mongoose from 'mongoose';
export const PRODUCT_MODEL = 'products';
export const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);
export interface productModel {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: string;
}
