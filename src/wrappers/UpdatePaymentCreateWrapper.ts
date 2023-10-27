import { TransactionCreateWrapper } from './TransactionCreateWrapper';

export interface UpdatePaymentCreateWrapper {
  paymentAmount: number;
  isCheckedOut: boolean;
  transaction?: TransactionCreateWrapper;
}
