import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Room {
  //data

  @Prop({ type: String, required: true })
  name: string;
}
