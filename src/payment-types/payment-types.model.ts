import * as mongoose from 'mongoose';
export const PAYMENT_TYPES_MODEL = 'paymentTypes';
export enum actionTypes {
  DISCOUNT = 'setDiscount',
  EMAIL = 'sendMail',
}
export const PaymentTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    action: {
      type: String,
      enum: actionTypes,
      default: 'user',
    },
  },
  { timestamps: true, versionKey: false },
);
export interface paymentTypesModel {
  _id: mongoose.Types.ObjectId;
  name: string;
  action: actionTypes;
}
