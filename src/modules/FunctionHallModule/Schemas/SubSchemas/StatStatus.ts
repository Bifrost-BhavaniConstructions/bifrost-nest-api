import { Prop, Schema } from '@nestjs/mongoose';
import { PowerMeterStatus } from './PowerMeterStatus';
import { RoomStatus } from './RoomStatus';
import { InventoryType } from './Inventory';

@Schema({ _id: false })
export class StatStatusRoom {
  //data

  @Prop([{ type: RoomStatus, required: true, default: [] }])
  rooms: RoomStatus[];
}

@Schema({ _id: false })
export class StatStatusPowerMeter {
  //data

  @Prop([
    {
      type: PowerMeterStatus,
      required: true,
      default: [],
    },
  ])
  powerMeters: PowerMeterStatus[];
}
@Schema({ _id: false })
export class StatStatusInventory {
  //data

  @Prop([
    {
      type: InventoryType,
      required: true,
      default: [],
    },
  ])
  inventory: InventoryType[];
}

@Schema({ _id: false })
export class StatStatus {
  //data

  @Prop([[{ type: RoomStatus, required: true, default: [] }]])
  roomsAll: RoomStatus[][];

  @Prop([[{ type: PowerMeterStatus, required: true, default: [] }]])
  powerMetersAll: PowerMeterStatus[][];

  @Prop([{ type: Number, required: true, default: 0 }])
  securityGuards: number[];

  @Prop([[{ type: InventoryType, required: true, default: [] }]])
  inventoryAll: InventoryType[][];
}
