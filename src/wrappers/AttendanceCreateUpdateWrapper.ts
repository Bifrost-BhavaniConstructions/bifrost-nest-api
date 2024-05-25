import { SiteShiftEnum } from '../enums/SiteShiftEnum';
import { UserRoleEnum } from '../enums/UserRoleEnum';
import { VendorTypeData } from '../modules/SiteManagementModule/Schemas/Attendance';
import { SiteDutyTypeEnum } from '../enums/SiteDutyTypeEnum';

export interface AttendanceCreateUpdateWrapper {
  _id?: string;
  of: string;
  shift?: SiteShiftEnum;
  role: UserRoleEnum;
  vendorItems?: VendorTypeData[];
  site: string;
  on: Date;
  dutyType?: SiteDutyTypeEnum;
  shiftPay?: number;
  otPay?: number;
}
