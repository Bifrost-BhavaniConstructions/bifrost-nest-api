import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CashAccount } from './CashAccount';
import { TransactionTypeEnum } from '../../../enums/TransactionTypeEnum';
import { PlatformEnum } from '../../../enums/PlatformEnum';
import { FunctionHall } from '../../FunctionHallModule/Schemas/FunctionHall';
import { TransactionPurpose } from './TransactionPurpose';

export type TransactionDocument = HydratedDocument<Transaction> & Document;

@Schema({ timestamps: true })
export class Transaction {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: 'ObjectId', ref: 'CashAccount' })
  from: CashAccount;

  @Prop({ type: 'ObjectId', ref: 'CashAccount' })
  to: CashAccount;

  @Prop({ type: String })
  toMisc: string;

  @Prop({ type: Number, required: true, default: 0 })
  amount: number;

  @Prop({ type: Number, default: 0 })
  fromBalance: number;

  @Prop({ type: Number, default: 0 })
  toBalance: number;

  @Prop({ type: String, required: true, default: '' })
  remarks: string;

  @Prop({ type: String, enum: TransactionTypeEnum, required: true })
  transactionType: TransactionTypeEnum;

  @Prop({ type: String, enum: PlatformEnum, required: true })
  platform: PlatformEnum;

  @Prop({ type: 'ObjectId', ref: 'FunctionHall' })
  functionHall: FunctionHall;

  @Prop({ type: 'ObjectId', ref: 'TransactionPurpose' })
  transactionPurpose: TransactionPurpose;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
