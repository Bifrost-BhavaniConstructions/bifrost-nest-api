import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { FunctionHallService } from './FunctionHallService';
import { Roles } from '../../decorators/Roles';
import { UserRoleEnum } from '../../enums/UserRoleEnum';
import { RoleGuard } from '../../guards/RoleGuard';
import { JWTGuard } from '../../guards/JWTGuard';
import { FunctionHallCreateWrapper } from '../../wrappers/FunctionHallCreateWrapper';
import { FunctionHall } from './Schemas/FunctionHall';

@Controller('/function-hall')
export class FunctionHallController {
  constructor(private readonly functionHallService: FunctionHallService) {}

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/')
  @UseGuards(JWTGuard, RoleGuard)
  createFunctionHall(
    @Body() functionHallCreateWrapper: FunctionHallCreateWrapper,
  ): Promise<FunctionHall> {
    return this.functionHallService.createFunctionHall(
      functionHallCreateWrapper,
    );
  }
  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Put('/')
  @UseGuards(JWTGuard, RoleGuard)
  updateFunctionHall(
    @Body() functionHallCreateWrapper: FunctionHallCreateWrapper,
  ): Promise<FunctionHall> {
    return this.functionHallService.updateFunctionHall(
      functionHallCreateWrapper,
    );
  }

  @Get('/')
  @UseGuards(JWTGuard)
  async getAllFunctionHalls(): Promise<FunctionHall[]> {
    return await this.functionHallService.getAllFunctionHalls();
  }
}
