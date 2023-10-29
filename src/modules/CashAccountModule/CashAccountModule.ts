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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: CashAccount.name, schema: CashAccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: TransactionPurpose.name, schema: TransactionPurposeSchema },
    ]),
  ],
  controllers: [CashAccountController],
  providers: [CashAccountService, AuthService, UserService, JWTStrategy],
})
export class CashAccountModule {}
