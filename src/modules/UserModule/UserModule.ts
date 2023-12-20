import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User';
import { UserController } from './UserController';
import { UserService } from './UserService';
import { JWTStrategy } from '../../jwt/JWTStrategy';
import { AuthService } from '../AuthModule/AuthService';
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
import { AttendanceService } from '../SiteManagementModule/AttendanceService';
import {
  AttendanceAccount,
  AttendanceAccountSchema,
} from '../SiteManagementModule/Schemas/AttendanceAccount';
import { SiteManagementModule } from '../SiteManagementModule/SiteManagementModule';
import {
  Attendance,
  AttendanceSchema,
} from '../SiteManagementModule/Schemas/Attendance';
import {
  SalaryAccountTransaction,
  SalaryAccountTransactionSchema,
} from '../SiteManagementModule/Schemas/AttendanceAccountTransaction';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: CashAccount.name, schema: CashAccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: TransactionPurpose.name, schema: TransactionPurposeSchema },
      { name: Attendance.name, schema: AttendanceSchema },
      { name: AttendanceAccount.name, schema: AttendanceAccountSchema },
      {
        name: SalaryAccountTransaction.name,
        schema: SalaryAccountTransactionSchema,
      },
    ]),
    SiteManagementModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    JWTStrategy,
    CashAccountService,
    AttendanceService,
  ],
})
export class UserModule {}
