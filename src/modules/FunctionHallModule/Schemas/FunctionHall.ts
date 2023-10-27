import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { InventoryType } from './SubSchemas/Inventory';
import { Generator } from './SubSchemas/Generator';
import { PowerMeter } from './SubSchemas/PowerMeter';
import { Room } from './SubSchemas/Room';

export type FunctionHallDocument = HydratedDocument<FunctionHall> & Document;

@Schema({ timestamps: true })
export class FunctionHall {
  _id: mongoose.Types.ObjectId;

  //data

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop([{ type: InventoryType }])
  inventory: InventoryType[];

  @Prop([{ type: Generator }])
  generators: Generator[];

  @Prop([{ type: PowerMeter }])
  powerMeters: PowerMeter[];

  @Prop([{ type: Room, default: [] }])
  rooms: Room[];
}

export const FunctionHallSchema = SchemaFactory.createForClass(FunctionHall);
