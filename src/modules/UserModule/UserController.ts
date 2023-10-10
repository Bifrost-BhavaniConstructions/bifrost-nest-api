import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './UserService';
import { UserCreateWrapper } from '../../wrappers/UserCreateWrapper';
import { Roles } from '../../decorators/Roles';
import { UserRoleEnum } from '../../enums/UserRoleEnum';
import { RoleGuard } from '../../guards/RoleGuard';
import { JWTGuard } from '../../guards/JWTGuard';
import { UserDTO } from '../../dtos/UserDTO';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/')
  @UseGuards(JWTGuard, RoleGuard)
  createUser(@Body() userCreateWrapper: UserCreateWrapper): Promise<UserDTO> {
    return this.userService.createUser(userCreateWrapper);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/')
  @UseGuards(JWTGuard, RoleGuard)
  getAllUsers(): Promise<UserDTO[]> {
    return this.userService.getAllUsers();
  }
}
