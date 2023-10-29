import { TransactionTypeEnum } from '../enums/TransactionTypeEnum';
import { IsNotEmpty } from 'class-validator';
import { PlatformEnum } from '../enums/PlatformEnum';

export class TransactionCreateWrapper {
  from?: string;
  to: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  transactionType: TransactionTypeEnum;
  @IsNotEmpty()
  platform: PlatformEnum;
  fromBalance?: number;
  toBalance?: number;
  functionHall: string;
}
