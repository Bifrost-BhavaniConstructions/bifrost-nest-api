import { UserRoleEnum } from '../enums/UserRoleEnum';
import SupervisorData from '../modules/UserModule/subschemas/SupervisorData';
import DriverData from '../modules/UserModule/subschemas/DriverData';
import BankData from '../modules/UserModule/subschemas/BankData';
import { PlatformEnum } from '../enums/PlatformEnum';
import ManagerData from '../modules/UserModule/subschemas/ManagerData';

export interface UserDTO {
  username: string;
  password?: string;
  role: UserRoleEnum;
  platforms: PlatformEnum[];
  name: string;
  personalMobileNumber: string;
  bankAccountPersonal: BankData;
  aadhaar: string;
  pan: string;
  nickname: string;
  dob: string;
  supervisorData?: SupervisorData;
  driverData?: DriverData;
  managerData?: ManagerData;
}
