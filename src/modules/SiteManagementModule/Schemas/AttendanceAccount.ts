import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../UserModule/User';

@Schema({ timestamps: true })
export class AttendanceAccount {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: User;

  @Prop({ type: Number, default: 0 })
  balance: number;
}

export const AttendanceAccountSchema =
  SchemaFactory.createForClass(AttendanceAccount);
