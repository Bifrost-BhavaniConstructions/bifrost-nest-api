import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
class BankData {
  @Prop()
  accountNo: string;

  @Prop()
  ifsc: string;

  @Prop()
  bankName: string;

  @Prop()
  accountHolder: string;

  @Prop()
  branch: string;
}

export default BankData;
