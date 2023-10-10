import { Prop, Schema } from '@nestjs/mongoose';
import BankData from './BankData';

@Schema({ _id: false })
class SecurityGuardSecondaryData {
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
}

export default SecurityGuardSecondaryData;
