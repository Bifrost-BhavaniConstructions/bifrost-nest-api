import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class InventoryType {
  //data

  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  count: number;
  @Prop({ type: Number, required: true })
  charge: number;
}
@Schema({ _id: false, timestamps: true })
class Inventory {
  @Prop([{ type: InventoryType }])
  items: InventoryType[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export default Inventory;
