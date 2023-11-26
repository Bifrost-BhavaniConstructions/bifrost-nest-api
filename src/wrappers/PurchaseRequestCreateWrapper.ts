import BankData from '../modules/UserModule/subschemas/BankData';

export interface PurchaseRequestCreateWrapper {
  _id?: string;
  createdBy: string;
  name: string;
  amount: number;
  destinationBankAccount: BankData;
  remarks: string;
  approver: string;
}
