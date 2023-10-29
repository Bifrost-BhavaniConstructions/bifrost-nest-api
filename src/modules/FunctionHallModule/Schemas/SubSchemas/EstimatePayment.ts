import { Prop, Schema } from '@nestjs/mongoose';
import { ModeOfPaymentEnum } from '../../../../enums/ModeOfPaymentEnum';

@Schema({ _id: false, timestamps: true })
class EstimatePayment {
  @Prop()
  payment: number;

  @Prop({ type: String, enum: ModeOfPaymentEnum, required: true })
  modeOfPayment: ModeOfPaymentEnum;

  @Prop()
  remark: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export default EstimatePayment;
