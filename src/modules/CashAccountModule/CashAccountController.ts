import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CashAccountService } from './CashAccountService';
import { Roles } from '../../decorators/Roles';
import { UserRoleEnum } from '../../enums/UserRoleEnum';
import { RoleGuard } from '../../guards/RoleGuard';
import { JWTGuard } from '../../guards/JWTGuard';
import { CashAccount } from './Schemas/CashAccount';
import { TransactionCreateWrapper } from '../../wrappers/TransactionCreateWrapper';
import { Transaction } from './Schemas/Transaction';

@Controller('/cash-account')
export class CashAccountController {
  constructor(private readonly cashAccountService: CashAccountService) {}

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/account/:userId')
  @UseGuards(JWTGuard, RoleGuard)
  createFunctionHall(@Param('userId') userId: string): Promise<CashAccount> {
    return this.cashAccountService.createCashAccount(userId);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/account/:userId')
  @UseGuards(JWTGuard, RoleGuard)
  getCashAccount(@Param('userId') userId: string): Promise<CashAccount> {
    return this.cashAccountService.getCashAccount(userId);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/transaction')
  @UseGuards(JWTGuard, RoleGuard)
  async addTransaction(
    @Body() transactionCreateWrapper: TransactionCreateWrapper,
  ): Promise<Transaction> {
    return await this.cashAccountService.addTransaction(
      transactionCreateWrapper,
    );
  }

  @Get('/transaction/:userId')
  @UseGuards(JWTGuard)
  async getTransactionsByUserId(@Param('userId') userId: string) {
    return await this.cashAccountService.getTransactionsByUserId(userId);
  }
}
