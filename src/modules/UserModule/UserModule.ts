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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: CashAccount.name, schema: CashAccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: TransactionPurpose.name, schema: TransactionPurposeSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JWTStrategy, CashAccountService],
})
export class UserModule {}
