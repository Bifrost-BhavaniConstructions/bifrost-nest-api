import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CashAccountController } from './CashAccountController';
import { CashAccountService } from './CashAccountService';
import { JWTStrategy } from '../../jwt/JWTStrategy';
import { AuthService } from '../AuthModule/AuthService';
import { CashAccount, CashAccountSchema } from './Schemas/CashAccount';
import { UserService } from '../UserModule/UserService';
import { User, UserSchema } from '../UserModule/User';
import { Transaction, TransactionSchema } from './Schemas/Transaction';
import {
  TransactionPurpose,
  TransactionPurposeSchema,
} from './Schemas/TransactionPurpose';
import {
  Attendance,
  AttendanceSchema,
} from '../SiteManagementModule/Schemas/Attendance';
import {
  AttendanceAccount,
  AttendanceAccountSchema,
} from '../SiteManagementModule/Schemas/AttendanceAccount';
import { AttendanceService } from '../SiteManagementModule/AttendanceService';
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
  controllers: [CashAccountController],
  providers: [
    CashAccountService,
    AuthService,
    UserService,
    JWTStrategy,
    AttendanceService,
  ],
})
export class CashAccountModule {}
