import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
class ManagerData {
  @Prop()
  companyMobileNumber: string;

  @Prop()
  salary: number;

  @Prop()
  payOT: number;

  @Prop({ type: [String], required: false })
  functionHalls: string;
}

export default ManagerData;
