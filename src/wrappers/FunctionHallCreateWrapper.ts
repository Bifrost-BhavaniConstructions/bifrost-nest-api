import { Prop } from '@nestjs/mongoose';
import { InventoryType } from '../modules/FunctionHallModule/Schemas/SubSchemas/Inventory';

export interface FunctionHallCreateWrapper {
  _id?: string;
  name: string;
  address: string;
  items: InventoryType[];
}
