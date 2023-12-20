import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { UserService } from '../UserModule/UserService';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../UserModule/User';
import { JWTStrategy } from '../../jwt/JWTStrategy';
import { CashAccountService } from '../CashAccountModule/CashAccountService';
import {
  CashAccount,
  CashAccountSchema,
} from '../CashAccountModule/Schemas/CashAccount';
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
  Attendance,
  AttendanceSchema,
} from '../SiteManagementModule/Schemas/Attendance';
import {
  AttendanceAccount,
  AttendanceAccountSchema,
} from '../SiteManagementModule/Schemas/AttendanceAccount';
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JWTStrategy,
    CashAccountService,
    AttendanceService,
  ],
})
export class AuthModule {}
