import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TransactionTypeEnum } from '../../../enums/TransactionTypeEnum';
import { PlatformEnum } from '../../../enums/PlatformEnum';

export type PurchaseRequestDocument = HydratedDocument<PurchaseRequest> &
  Document;

@Schema({ timestamps: true })
export class PurchaseRequest {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: String })
  from: string;

  @Prop({ type: String })
  to: string;

  @Prop({ type: String })
  toMisc: string;

  @Prop({ type: Number, required: true, default: 0 })
  amount: number;

  @Prop({ type: String, required: true, default: '' })
  remarks: string;

  @Prop({ type: String, enum: TransactionTypeEnum, required: true })
  transactionType: TransactionTypeEnum;

  @Prop({ type: String, enum: PlatformEnum, required: true })
  platform: PlatformEnum;
}

export const TransactionSchema = SchemaFactory.createForClass(PurchaseRequest);
