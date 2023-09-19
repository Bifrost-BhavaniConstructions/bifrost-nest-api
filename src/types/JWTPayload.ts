import mongoose from 'mongoose';

export interface JWTPayload {
  username: string;
  _id: mongoose.Types.ObjectId;
}
