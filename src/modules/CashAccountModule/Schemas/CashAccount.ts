import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../UserModule/User';

export type CashAccountDocument = HydratedDocument<CashAccount> & Document;

@Schema({ timestamps: true })
export class CashAccount {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: User;

  @Prop({ type: Number, required: true, default: 0 })
  balance: number;
}

export const CashAccountSchema = SchemaFactory.createForClass(CashAccount);
