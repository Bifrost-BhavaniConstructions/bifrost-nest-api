import { User } from '../modules/UserModule/User';
import { UserDTO } from '../dtos/UserDTO';

export const sanitizeUser = (user: User) => {
  const sanitized: UserDTO = { ...user };
  delete sanitized['password'];
  return sanitized;
};
