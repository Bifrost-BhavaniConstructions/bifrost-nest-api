import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: true })
class EstimatePayment {
  @Prop()
  payment: number;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export default EstimatePayment;
