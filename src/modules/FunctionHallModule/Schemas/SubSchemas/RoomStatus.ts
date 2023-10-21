import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class RoomStatus {
  //data

  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Date, required: true })
  assignedAt: string;
}
