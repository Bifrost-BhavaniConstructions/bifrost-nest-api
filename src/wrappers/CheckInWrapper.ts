import {
  StatStatusInventory,
  StatStatusPowerMeter,
  StatStatusRoom,
} from '../modules/FunctionHallModule/Schemas/SubSchemas/StatStatus';

export interface CheckInWrapper {
  rooms: StatStatusRoom;
  powerMeters: StatStatusPowerMeter;
  securityGuards: number;
  inventory: StatStatusInventory;
}
