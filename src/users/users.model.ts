import * as mongoose from 'mongoose';

import { UserRole } from './user.interfaces';

export const USER_MODEL = 'AuthUsers';

export interface UserModel {
  _id: string;
  name: string;
  fullname: string;
  email: string;
  dob: Date;
  password: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserRaw extends UserModel {
  roles: UserRole[];
}
export const UserSchema = new mongoose.Schema(
  {
    phoneNumber: Number,
    fullname: String,
    dob: Date,
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: true,
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.DEFAULT],
    },
  },
  { timestamps: true, versionKey: false },
);
