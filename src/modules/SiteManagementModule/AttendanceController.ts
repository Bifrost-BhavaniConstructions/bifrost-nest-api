import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceService } from './AttendanceService';
import { AttendanceCreateUpdateWrapper } from '../../wrappers/AttendanceCreateUpdateWrapper';
import { Attendance } from './Schemas/Attendance';
import { Types } from 'mongoose';

@Controller('/site-management/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/')
  async createAttendance(
    @Body() requestData: AttendanceCreateUpdateWrapper,
  ): Promise<Attendance> {
    return this.attendanceService.createAttendance(requestData);
  }
  @Get('/payout/month/:userId')
  async getAttendancePayoutLastMonth(
    @Param('userId') userId: string,
  ): Promise<number> {
    return this.attendanceService.getSalaryPayoutOfUserCurrentMonth(userId);
  }
  @Get('/six-month/:userId')
  async getPastSixMonthsAttendance(
    @Param('userId') userId: string,
  ): Promise<any> {
    return this.attendanceService.getPastSixMonthsAttendance(userId);
  }

  @Post('/transaction/:userId')
  async addTransaction(
    @Param('userId') userId: string, // Assuming userId is sent in the request body
    @Body('amount') amount: number,
    @Body('isSalary') isSalary: boolean,
  ): Promise<any> {
    // Convert userId string to ObjectId
    const objectIdUserId = new Types.ObjectId(userId);

    try {
      const newTransaction =
        await this.attendanceService.addAllowanceOrDeduction(
          objectIdUserId,
          amount,
          isSalary,
        );
      return { success: true, transaction: newTransaction };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('/transactions/:userId')
  async getUserTransactions(@Param('userId') userId: string): Promise<any> {
    return this.attendanceService.getUserTransactions(userId);
  }

  @Post('/salary')
  async saveSalary(
    @Body() requestBody: { userId: string; monthYear: string; amount: number },
  ): Promise<string> {
    const { userId, monthYear, amount } = requestBody;

    try {
      await this.attendanceService.saveAndBalanceSalaryForMonthYear(
        userId,
        monthYear,
        amount,
      );
      return 'Salary saved and transactions balanced successfully';
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  @Post('/variable')
  async saveVariable(
    @Body()
    requestBody: {
      userId: string;
      fromDate: string;
      toDate: string;
      amount: number;
    },
  ): Promise<string> {
    const { userId, fromDate, toDate, amount } = requestBody;

    try {
      await this.attendanceService.saveAndBalanceVariableForMonthYear(
        userId,
        fromDate,
        toDate,
        amount,
      );
      return 'Salary saved and transactions balanced successfully';
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  @Post('/salary/advance')
  async getSalary(
    @Body() requestBody: { userId: string; monthYear: string },
  ): Promise<number> {
    const { userId, monthYear } = requestBody;
    return await this.attendanceService.getBalanceForMonthYear(
      userId,
      monthYear,
    );
  }

  @Get('/variable')
  async getSalaryPayout(
    @Query('userId') userId: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<number> {
    return this.attendanceService.getSalaryPayoutOfUserBetweenDates(
      userId,
      fromDate,
      toDate,
    );
  }
  @Get('/variable/advance')
  async getAlowancePayout(
    @Query('userId') userId: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<number> {
    return this.attendanceService.getVariableAllowanceOfUserBetweenDates(
      userId,
      fromDate,
      toDate,
    );
  }
}
