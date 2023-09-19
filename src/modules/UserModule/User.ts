import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '../../enums/UserRoleEnum';
import SupervisorData from './subschemas/SupervisorData';
import DriverData from './subschemas/DriverData';
import BankData from './subschemas/BankData';

export type UserDocument = HydratedDocument<User> & Document;

@Schema({ timestamps: true })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, unique: true, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: UserRoleEnum, required: true })
  role: UserRoleEnum;

  @Prop({ type: String })
  refreshToken: string;

  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  personalMobileNumber: string;

  @Prop({ type: BankData, required: true })
  bankAccountPersonal: BankData;

  @Prop({ type: String, required: true })
  aadhaar: string;

  @Prop({ type: String, required: true })
  pan: string;

  @Prop({ type: String, required: true })
  nickname: string;

  @Prop({ type: String, required: true })
  dob: string;

  @Prop({ type: SupervisorData })
  supervisorData: SupervisorData;

  @Prop({ type: DriverData })
  driverData: DriverData;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this['password'] = await bcrypt.hash(this['password'], 10);
    return next();
  } catch (err) {
    return next(err);
  }
});
