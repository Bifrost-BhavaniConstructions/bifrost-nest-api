import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SiteDocument = HydratedDocument<Site> & Document;

@Schema({ timestamps: true })
export class Site {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
