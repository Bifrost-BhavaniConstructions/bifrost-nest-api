import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PowerMeterStatus {
  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  reading: string;
}
