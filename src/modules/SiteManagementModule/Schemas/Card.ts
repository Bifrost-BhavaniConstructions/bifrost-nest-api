import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../UserModule/User';
import { AssetAssignment } from './SubSchemas/AssetAssignment';

@Schema({ timestamps: true })
export class Card {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  number: string;

  @Prop({ type: String, required: true })
  expiry: string;

  @Prop({ type: String, required: true })
  nameOnCard: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  assignedTo?: User;

  @Prop([{ type: AssetAssignment, default: [] }])
  assignmentHistory: AssetAssignment[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
