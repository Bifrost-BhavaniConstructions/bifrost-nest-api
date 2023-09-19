import { UserRoleEnum } from '../enums/UserRoleEnum';
import SupervisorData from '../modules/UserModule/subschemas/SupervisorData';
import DriverData from '../modules/UserModule/subschemas/DriverData';
import BankData from '../modules/UserModule/subschemas/BankData';

export interface UserDTO {
  username: string;
  password?: string;
  role: UserRoleEnum;
  name: string;
  personalMobileNumber: string;
  bankAccountPersonal: BankData;
  aadhaar: string;
  pan: string;
  nickname: string;
  dob: string;
  supervisorData?: SupervisorData;
  driverData?: DriverData;
}
