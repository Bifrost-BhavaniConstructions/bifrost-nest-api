import {
  StatStatusInventory,
  StatStatusPowerMeter,
  StatStatusRoom,
} from '../modules/FunctionHallModule/Schemas/SubSchemas/StatStatus';
import { GeneratorStatus } from '../modules/FunctionHallModule/Schemas/SubSchemas/GeneratorStatus';

export interface CheckInWrapper {
  rooms: StatStatusRoom;
  powerMeters: StatStatusPowerMeter;
  securityGuards: number;
  inventory: StatStatusInventory;
  generators: GeneratorStatus[];
}
