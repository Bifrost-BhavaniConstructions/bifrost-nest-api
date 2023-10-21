import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Generator {
  //data

  @Prop({ type: String, required: true })
  name: string;
}
