import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
class ManagerData {
  @Prop()
  companyMobileNumber: string;

  @Prop()
  salary: number;

  @Prop()
  payOT: number;
}

export default ManagerData;
