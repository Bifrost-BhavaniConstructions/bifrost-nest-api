import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enums/UserRoleEnum';

export const Roles = (...args: UserRoleEnum[]) => SetMetadata('roles', args);
