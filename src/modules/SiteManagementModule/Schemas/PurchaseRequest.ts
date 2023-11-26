import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../UserModule/User';
import BankData from '../../UserModule/subschemas/BankData';
import { PurchaseRequestStatusEnum } from '../../../enums/PurchaseRequestStatusEnum';

@Schema({ timestamps: true })
export class PurchaseRequest {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: 'ObjectId', ref: 'User' })
  createdBy: User;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  name: number;

  @Prop({ type: BankData, required: true })
  destinationBankAccount: BankData;

  @Prop({ type: String, required: true })
  remarks: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  approver: User;

  @Prop({ type: String, required: false })
  approvalRemarks: string;

  @Prop({ type: Date, required: false })
  approvedAt: Date;

  @Prop({ type: String, required: false })
  confirmationRemarks: string;

  @Prop({ type: Date, required: false })
  confirmedAt: Date;

  @Prop({ type: String, required: false })
  chequeNumber: string;

  @Prop({ type: String, required: false })
  utrNumber: string;

  @Prop({ type: String, enum: PurchaseRequestStatusEnum, required: true })
  status: PurchaseRequestStatusEnum;
}

export const PurchaseRequestSchema =
  SchemaFactory.createForClass(PurchaseRequest);
