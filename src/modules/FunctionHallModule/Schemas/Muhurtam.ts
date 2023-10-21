import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MuhurtamDocument = HydratedDocument<Muhurtam> & Document;

@Schema({ timestamps: true })
export class Muhurtam {
  _id: mongoose.Types.ObjectId;

  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  time: string;
}

export const MuhurtamSchema = SchemaFactory.createForClass(Muhurtam);
