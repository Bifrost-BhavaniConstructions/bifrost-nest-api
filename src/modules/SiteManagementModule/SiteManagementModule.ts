import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTStrategy } from '../../jwt/JWTStrategy';
import { AuthService } from '../AuthModule/AuthService';
import { UserService } from '../UserModule/UserService';
import { User, UserSchema } from '../UserModule/User';
import {
  CashAccount,
  CashAccountSchema,
} from '../CashAccountModule/Schemas/CashAccount';
import { CashAccountService } from '../CashAccountModule/CashAccountService';
import {
  Transaction,
  TransactionSchema,
} from '../CashAccountModule/Schemas/Transaction';
import {
  TransactionPurpose,
  TransactionPurposeSchema,
} from '../CashAccountModule/Schemas/TransactionPurpose';
import { SiteManagementService } from './SiteManagementService';
import { Site, SiteSchema } from './Schemas/Site';
import { SiteManagementController } from './SiteManagementController';
import { Vehicle, VehicleSchema } from './Schemas/Vehicle';
import { Phone, PhoneSchema } from './Schemas/Phone';
import { Card, CardSchema } from './Schemas/Card';
import { PurchaseRequestController } from './PurchaseRequestController';
import {
  PurchaseRequest,
  PurchaseRequestSchema,
} from './Schemas/PurchaseRequest';
import { PurchaseRequestService } from './PurchaseRequestService';
import { Attendance, AttendanceSchema } from './Schemas/Attendance';
import { AttendanceController } from './AttendanceController';
import { AttendanceService } from './AttendanceService';
import {
  AttendanceAccount,
  AttendanceAccountSchema,
} from './Schemas/AttendanceAccount';
import {
  SalaryAccountTransaction,
  SalaryAccountTransactionSchema,
} from './Schemas/AttendanceAccountTransaction';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Site.name, schema: SiteSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Phone.name, schema: PhoneSchema },
      { name: Card.name, schema: CardSchema },
      { name: CashAccount.name, schema: CashAccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: TransactionPurpose.name, schema: TransactionPurposeSchema },
      { name: PurchaseRequest.name, schema: PurchaseRequestSchema },
      { name: Attendance.name, schema: AttendanceSchema },
      { name: AttendanceAccount.name, schema: AttendanceAccountSchema },
      {
        name: SalaryAccountTransaction.name,
        schema: SalaryAccountTransactionSchema,
      },
    ]),
  ],
  controllers: [
    SiteManagementController,
    PurchaseRequestController,
    AttendanceController,
  ],
  providers: [
    SiteManagementService,
    PurchaseRequestService,
    AttendanceService,
    AuthService,
    UserService,
    JWTStrategy,
    CashAccountService,
  ],
})
export class SiteManagementModule {}
