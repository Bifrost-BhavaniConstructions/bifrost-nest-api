import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../UserModule/User';
import EstimatePayment from '../../FunctionHallModule/Schemas/SubSchemas/EstimatePayment';
import { AssetAssignment } from './SubSchemas/AssetAssignment';

@Schema({ timestamps: true })
export class Vehicle {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  number: string;

  @Prop({ type: String, required: true })
  chassis: string;

  @Prop({ type: String, required: true })
  class: string;

  @Prop({ type: String, required: true })
  model: string;

  @Prop({ type: String, required: true })
  make: string;

  @Prop({ type: String })
  puc: string;

  @Prop({ type: Date })
  fitness: Date;

  @Prop({ type: Date })
  permit: Date;

  @Prop({ type: Date })
  insurance: Date;

  @Prop({ type: String })
  insuranceCompany: string;

  @Prop({ type: Date })
  tax: Date;

  @Prop({ type: Date })
  regValidity: Date;

  @Prop({ type: String })
  taxType: string;

  @Prop({ type: String })
  insuranceType: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  assignedTo?: User;

  @Prop([{ type: AssetAssignment, default: [] }])
  assignmentHistory: AssetAssignment[];
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
