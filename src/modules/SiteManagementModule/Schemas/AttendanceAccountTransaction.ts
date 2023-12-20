import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../UserModule/User';
import { SalaryTransactionTypeEnum } from '../../../enums/SalaryTransactionTypeEnum';

@Schema({ timestamps: true })
export class SalaryAccountTransaction {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: User;

  @Prop({ type: Number, default: 0 })
  amount: number;

  @Prop({ type: String })
  salaryMonthYear: number;

  @Prop({ type: Date })
  variableFrom: Date;

  @Prop({ type: Date })
  variableTo: Date;

  @Prop({ type: 'String', enum: SalaryTransactionTypeEnum })
  transactionType: SalaryTransactionTypeEnum;

  @Prop({ type: Boolean, default: false })
  isBalanced: boolean;
}

export const SalaryAccountTransactionSchema = SchemaFactory.createForClass(
  SalaryAccountTransaction,
);
