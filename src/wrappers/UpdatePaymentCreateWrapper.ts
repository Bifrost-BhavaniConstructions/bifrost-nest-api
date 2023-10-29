import { TransactionCreateWrapper } from './TransactionCreateWrapper';
import { ModeOfPaymentEnum } from '../enums/ModeOfPaymentEnum';

export interface UpdatePaymentCreateWrapper {
  paymentAmount: number;
  isCheckedOut: boolean;
  modeOfPayment?: ModeOfPaymentEnum;
  remark?: string;
  transaction?: TransactionCreateWrapper;
}
