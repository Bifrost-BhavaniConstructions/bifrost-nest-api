import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../UserModule/User';
import { SiteShiftEnum } from '../../../enums/SiteShiftEnum';
import { UserRoleEnum } from '../../../enums/UserRoleEnum';
import { Site } from './Site';
import { SiteDutyTypeEnum } from '../../../enums/SiteDutyTypeEnum';

@Schema({ _id: false })
export class VendorTypeData {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  cost: number;
  @Prop({ type: Number, required: true })
  amount: number;
}

@Schema({ _id: false, timestamps: true })
export class VendorAttendance {
  //data

  @Prop({ type: 'String', enum: SiteShiftEnum })
  shift?: SiteShiftEnum;
}

@Schema({ timestamps: true })
export class Attendance {
  _id: mongoose.Types.ObjectId;
  //data

  @Prop({ type: 'ObjectId', ref: 'User' })
  of: User;

  @Prop({ type: 'String', enum: SiteShiftEnum })
  shift?: SiteShiftEnum;

  @Prop({ type: Number })
  shiftPay?: number;

  @Prop({ type: Number })
  otPay?: number;

  @Prop({ type: 'String', enum: UserRoleEnum })
  role: UserRoleEnum;

  @Prop([{ type: VendorTypeData }])
  vendorItems?: VendorTypeData[];

  @Prop({ type: 'ObjectId', ref: 'Site' })
  site: Site;

  @Prop({ type: Date })
  on: Date;

  @Prop({ type: Boolean, default: false })
  isBalanced: boolean;

  @Prop({ type: 'String', enum: SiteDutyTypeEnum })
  dutyType?: SiteDutyTypeEnum;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
