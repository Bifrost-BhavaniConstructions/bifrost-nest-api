import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FunctionHallController } from './FunctionHallController';
import { FunctionHallService } from './FunctionHallService';
import { JWTStrategy } from '../../jwt/JWTStrategy';
import { AuthService } from '../AuthModule/AuthService';
import { FunctionHall, FunctionHallSchema } from './Schemas/FunctionHall';
import { UserService } from '../UserModule/UserService';
import { User, UserSchema } from '../UserModule/User';
import { Enquiry, EnquirySchema } from './Schemas/Enquiry';
import { EnquiryType, EnquiryTypeSchema } from './Schemas/EnquiryType';
import { Muhurtam, MuhurtamSchema } from './Schemas/Muhurtam';
import { EnquiryController } from './Submodules/Enquiry/EnquiryController';
import { EnquiryService } from './Submodules/Enquiry/EnquiryService';
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
      { name: FunctionHall.name, schema: FunctionHallSchema },
      { name: Enquiry.name, schema: EnquirySchema },
      { name: EnquiryType.name, schema: EnquiryTypeSchema },
      { name: Muhurtam.name, schema: MuhurtamSchema },
      { name: CashAccount.name, schema: CashAccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: TransactionPurpose.name, schema: TransactionPurposeSchema },
      { name: TransactionPurpose.name, schema: TransactionPurposeSchema },
      { name: Attendance.name, schema: AttendanceSchema },
      { name: AttendanceAccount.name, schema: AttendanceAccountSchema },
      {
        name: SalaryAccountTransaction.name,
        schema: SalaryAccountTransactionSchema,
      },
    ]),
  ],
  controllers: [FunctionHallController, EnquiryController],
  providers: [
    FunctionHallService,
    AuthService,
    UserService,
    EnquiryService,
    JWTStrategy,
    CashAccountService,
    AttendanceService,
  ],
})
export class FunctionHallModule {}
