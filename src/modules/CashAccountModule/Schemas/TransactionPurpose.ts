import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class TransactionPurpose {
  _id: mongoose.Types.ObjectId;

  //data

  @Prop({ type: String, required: true })
  name: string;
}

export const TransactionPurposeSchema =
  SchemaFactory.createForClass(TransactionPurpose);
