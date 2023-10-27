import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FunctionHall } from './FunctionHall';
import Estimate from './SubSchemas/Estimate';
import { User } from '../../UserModule/User';
import { EnquiryType } from './EnquiryType';
import EstimatePayment from './SubSchemas/EstimatePayment';
import Inventory from './SubSchemas/Inventory';
import { StatStatus } from './SubSchemas/StatStatus';
import FollowUp from './SubSchemas/FollowUp';

export type EnquiryDocument = HydratedDocument<Enquiry> & Document;

@Schema({ timestamps: true })
export class Enquiry {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FunctionHall',
  })
  functionHall: FunctionHall;

  @Prop({ type: Date, required: true })
  fromDate: Date;

  @Prop({ type: Date, required: false })
  toDate: Date;

  @Prop([{ type: Estimate, required: false }])
  estimates: Estimate[];

  @Prop({
    type: { type: 'ObjectId', ref: 'User' },
  })
  primaryReference: User;

  @Prop({ type: String })
  secondaryReference: string;

  @Prop({ type: Number, required: true })
  primaryContactNumber: number;

  @Prop({ type: String, required: true })
  primaryContactName: string;

  @Prop({ type: Number })
  secondaryContactNumber: number;

  @Prop({ type: String })
  secondaryContactName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnquiryType',
  })
  enquiryType: EnquiryType;

  @Prop({ type: Number, default: 0 })
  bookingAmount: number;

  @Prop([{ type: EstimatePayment, default: [] }])
  payments: EstimatePayment[];

  @Prop({ type: Boolean, required: true, default: false })
  isBooking: boolean;

  @Prop([{ type: Inventory, default: [] }])
  inventory: Inventory[];

  @Prop([{ type: FollowUp, default: [] }])
  followUps: FollowUp[];

  @Prop({ type: StatStatus })
  statStatus: StatStatus;

  @Prop({ type: Boolean, required: true, default: false })
  isCheckedIn: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isCheckedOut: boolean;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
