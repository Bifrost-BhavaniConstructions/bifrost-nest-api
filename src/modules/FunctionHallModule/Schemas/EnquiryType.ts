import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MuhurtamDocument = HydratedDocument<EnquiryType> & Document;

@Schema({ timestamps: true })
export class EnquiryType {
  _id: mongoose.Types.ObjectId;

  //data

  @Prop({ type: String, required: true })
  name: string;
}

export const EnquiryTypeSchema = SchemaFactory.createForClass(EnquiryType);
