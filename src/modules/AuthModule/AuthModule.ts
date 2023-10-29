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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: CashAccount.name, schema: CashAccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: TransactionPurpose.name, schema: TransactionPurposeSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JWTStrategy, CashAccountService],
})
export class AuthModule {}
