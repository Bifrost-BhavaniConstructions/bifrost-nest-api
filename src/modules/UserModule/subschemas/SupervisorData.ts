import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
class SupervisorData {
  @Prop()
  companyMobileNumber: string;

  @Prop()
  salary: number;

  @Prop()
  payOT: number;
}

export default SupervisorData;
