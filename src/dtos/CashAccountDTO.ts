import { User } from '../modules/UserModule/User';

export interface CashAccountDTO {
  user: User;
  balance: number;
  _id: string;
}
