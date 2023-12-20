import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Attendance, VendorTypeData } from './Schemas/Attendance';
import { AttendanceCreateUpdateWrapper } from '../../wrappers/AttendanceCreateUpdateWrapper';
import { AttendanceAccount } from './Schemas/AttendanceAccount';
import { User } from '../UserModule/User';
import { UserRoleEnum } from '../../enums/UserRoleEnum';
import * as moment from 'moment';
import { SalaryAccountTransaction } from './Schemas/AttendanceAccountTransaction';
import { SalaryTransactionTypeEnum } from '../../enums/SalaryTransactionTypeEnum';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private Attendances: Model<Attendance>,
    @InjectModel(User.name)
    private Users: Model<User>,
    @InjectModel(AttendanceAccount.name)
    private AttendanceAccounts: Model<AttendanceAccount>,
    @InjectModel(SalaryAccountTransaction.name)
    private SalaryAccountTransactions: Model<SalaryAccountTransaction>,
  ) {}

  async createAttendance(
    requestData: AttendanceCreateUpdateWrapper,
  ): Promise<Attendance> {
    try {
      return await this.Attendances.create(requestData);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create Purchase Request');
    }
  }

  async createAttendanceAccount(userId: string): Promise<AttendanceAccount> {
    const attendanceAccountExists = await this.AttendanceAccounts.exists({
      user: userId,
    });
    if (attendanceAccountExists) {
      throw new HttpException(
        'Attendance Account already exists',
        HttpStatus.CONFLICT,
      );
    }
    const attendanceAccount = new this.AttendanceAccounts({
      user: new mongoose.Types.ObjectId(userId),
      balance: 0,
    });
    return await attendanceAccount.save();
  }
  async getSalaryPayoutOfUserCurrentMonth(userId: string): Promise<number> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const user = await this.Users.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const userRole = user.role; // Assuming user role is accessible in the User schema

    let totalSalary = 0;

    if (userRole === UserRoleEnum.DRIVER) {
      const attendances = await this.Attendances.find({
        of: userId,
        shiftPay: { $exists: true },
        on: {
          $gte: new Date(currentYear, currentMonth, 1),
          $lt: new Date(currentYear, currentMonth, currentDate.getDate() + 1),
        },
        isBalanced: false,
      }).exec();

      attendances.forEach((attendance) => {
        totalSalary += attendance.shiftPay || 0;
      });
    } else if (userRole === UserRoleEnum.VENDOR) {
      const attendances = await this.Attendances.find({
        of: userId,
        vendorItems: { $exists: true, $ne: [] },
        on: {
          $gte: new Date(currentYear, currentMonth, 1),
          $lt: new Date(currentYear, currentMonth, currentDate.getDate() + 1),
        },
        isBalanced: false,
      }).exec();

      attendances.forEach((attendance) => {
        attendance.vendorItems?.forEach((item: VendorTypeData) => {
          totalSalary += item.cost || 0;
        });
      });
    } else {
      throw new Error('User role not supported for salary calculation');
    }

    return totalSalary;
  }

  async getSalaryPayoutOfUserBetweenDates(
    userId: string,
    fromDateStr: string,
    toDateStr: string,
  ): Promise<number> {
    const user = await this.Users.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);

    const userRole = user.role; // Assuming user role is accessible in the User schema

    let totalSalary = 0;

    if (userRole === UserRoleEnum.DRIVER) {
      const attendances = await this.Attendances.find({
        of: userId,
        shiftPay: { $exists: true },
        on: {
          $gte: fromDate,
          $lt: toDate,
        },
        isBalanced: false,
      }).exec();

      attendances.forEach((attendance) => {
        totalSalary += attendance.shiftPay || 0;
      });
    } else if (userRole === UserRoleEnum.VENDOR) {
      const attendances = await this.Attendances.find({
        of: userId,
        vendorItems: { $exists: true, $ne: [] },
        on: {
          $gte: fromDate,
          $lt: toDate,
        },
        isBalanced: false,
      }).exec();

      attendances.forEach((attendance) => {
        attendance.vendorItems?.forEach((item: VendorTypeData) => {
          totalSalary += item.cost || 0;
        });
      });
    } else {
      throw new Error('User role not supported for salary calculation');
    }

    return totalSalary;
  }

  async getVariableAllowanceOfUserBetweenDates(
    userId: string,
    fromDateStr: string,
    toDateStr: string,
  ): Promise<number> {
    const transactions = await this.SalaryAccountTransactions.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: {
            $gte: moment(fromDateStr, 'yyyy-MM-DD').toDate(), // -1 because months are zero-indexed
            $lte: moment(toDateStr, 'yyyy-MM-DD').toDate(),
          },
          isBalanced: false,
          $or: [
            { transactionType: SalaryTransactionTypeEnum.ALLOWANCE_ADVANCE },
            { transactionType: SalaryTransactionTypeEnum.ALLOWANCE_DEDUCTION },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    '$transactionType',
                    SalaryTransactionTypeEnum.ALLOWANCE_DEDUCTION,
                  ],
                },
                '$amount', // Subtract amount if deduction type
                '$amount', // Otherwise, use the original amount
              ],
            },
          },
        },
      },
    ]).exec();

    // Check if there are transactions found and calculate total amount
    let totalAmount = 0;
    if (transactions.length > 0) {
      totalAmount = transactions[0].totalAmount || 0;
    }

    return totalAmount;
  }

  async getPastSixMonthsAttendance(
    userId: string,
  ): Promise<{ date: string; title: string }[]> {
    const user = await this.Users.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const userRole = user.role; // Assuming user role is accessible in the User schema

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 1);

    const attendances = await this.Attendances.find({
      of: userId,
      on: { $gte: sixMonthsAgo },
    })
      .sort({ on: 1 })
      .exec();

    return attendances.map((attendance) => {
      const formattedAttendance: { date: string; title: string } = {
        date: moment(new Date(attendance.on)).format('yyyy-MM-DD'),
        title: '',
      };

      if (userRole === UserRoleEnum.VENDOR) {
        formattedAttendance.title = this.getVendorTitle(attendance);
      } else if (userRole === UserRoleEnum.DRIVER) {
        formattedAttendance.title = this.getDriverTitle(attendance);
      } else {
        formattedAttendance.title = 'Role not supported for attendance';
      }

      return formattedAttendance;
    });
  }

  private getVendorTitle(attendance: Attendance): string {
    let vendorItemsTitle = '';
    attendance.vendorItems?.forEach((item: VendorTypeData) => {
      vendorItemsTitle += `${item.name} - ${item.amount} (₹${item.cost});`;
    });
    return vendorItemsTitle;
  }

  private getDriverTitle(attendance: Attendance): string {
    let title = '';
    if (attendance.shift && attendance.dutyType) {
      title = `${attendance.shift} - ${attendance.dutyType} (₹ ${attendance.shiftPay})`;
    }
    return title;
  }

  async addAllowanceOrDeduction(
    userId: mongoose.Types.ObjectId,
    amount: number,
    isSalary: boolean,
  ): Promise<SalaryAccountTransaction> {
    const transactionType = isSalary
      ? amount >= 0
        ? SalaryTransactionTypeEnum.SALARY_ADVANCE
        : SalaryTransactionTypeEnum.SALARY_DEDUCTION
      : amount >= 0
      ? SalaryTransactionTypeEnum.ALLOWANCE_ADVANCE
      : SalaryTransactionTypeEnum.ALLOWANCE_DEDUCTION;

    const newTransaction = new this.SalaryAccountTransactions({
      user: userId,
      amount: Math.abs(amount),
      transactionType,
      isBalanced: false,
    });

    return await newTransaction.save();
  }

  async getUserTransactions(
    userId: string,
  ): Promise<SalaryAccountTransaction[]> {
    return this.SalaryAccountTransactions.find({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async saveAndBalanceSalaryForMonthYear(
    userId: string,
    monthYear: string,
    amount: number,
  ): Promise<void> {
    const [month, year] = this.extractMonthYear(monthYear);

    // Save salary for the given month and year (example: perform salary transactions saving logic)
    const balanceTransaction = new this.SalaryAccountTransactions({
      user: userId,
      amount: amount,
      salaryMonthYear: monthYear,
      transactionType: SalaryTransactionTypeEnum.SALARY,
      isBalanced: true,
    });

    await balanceTransaction.save();

    // Fetch transactions for the specified user and monthYear
    await this.SalaryAccountTransactions.updateMany(
      {
        user: userId,
        createdAt: {
          $gte: new Date(year, month - 1, 1), // -1 because months are zero-indexed
          $lt: new Date(year, month, 1),
        },
        $or: [
          { transactionType: SalaryTransactionTypeEnum.SALARY_ADVANCE },
          { transactionType: SalaryTransactionTypeEnum.SALARY_DEDUCTION },
        ],
      },
      { $set: { isBalanced: true } },
    ).exec();
  }

  async saveAndBalanceVariableForMonthYear(
    userId: string,
    fromDateStr: string,
    toDateStr: string,
    amount: number,
  ): Promise<void> {
    // Save salary for the given month and year (example: perform salary transactions saving logic)
    const balanceTransaction = new this.SalaryAccountTransactions({
      user: userId,
      amount: amount,
      variableFrom: moment(fromDateStr, 'yyyy-MM-DD').toDate(),
      variableTo: moment(toDateStr, 'yyyy-MM-DD').toDate(),
      transactionType: SalaryTransactionTypeEnum.ALLOWANCE,
      isBalanced: true,
    });

    await balanceTransaction.save();

    // Fetch transactions for the specified user and monthYear
    await this.SalaryAccountTransactions.updateMany(
      {
        user: new mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: moment(fromDateStr, 'yyyy-MM-DD').toDate(), // -1 because months are zero-indexed
          $lte: moment(toDateStr, 'yyyy-MM-DD').toDate(),
        },
        isBalanced: false,
        $or: [
          { transactionType: SalaryTransactionTypeEnum.ALLOWANCE_ADVANCE },
          { transactionType: SalaryTransactionTypeEnum.ALLOWANCE_DEDUCTION },
        ],
      },
      { $set: { isBalanced: true } },
    ).exec();

    const user = await this.Users.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);

    const userRole = user.role; // Assuming user role is accessible in the User schema

    if (userRole === UserRoleEnum.DRIVER) {
      await this.Attendances.updateMany(
        {
          of: userId,
          shiftPay: { $exists: true },
          on: {
            $gte: fromDate,
            $lt: toDate,
          },
          isBalanced: false,
        },
        { $set: { isBalanced: true } },
      ).exec();
    } else if (userRole === UserRoleEnum.VENDOR) {
      await this.Attendances.updateMany(
        {
          of: userId,
          vendorItems: { $exists: true, $ne: [] },
          on: {
            $gte: fromDate,
            $lt: toDate,
          },
          isBalanced: false,
        },
        { $set: { isBalanced: true } },
      ).exec();
    } else {
      throw new Error('User role not supported for salary calculation');
    }
  }

  async getBalanceForMonthYear(
    userId: string,
    monthYear: string,
  ): Promise<number> {
    const isExist = await this.SalaryAccountTransactions.find({
      user: userId,
      salaryMonthYear: monthYear,
    }).exec();
    if (isExist.length > 0) {
      throw new HttpException('Salary already paid', HttpStatus.CONFLICT);
    }
    const [month, year] = this.extractMonthYear(monthYear);
    // Perform operations to save salary for the given month and year

    const transactions = await this.SalaryAccountTransactions.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: {
            $gte: new Date(year, month - 1, 1), // -1 because months are zero-indexed
            $lte: new Date(year, month, 1),
          },
          isBalanced: false,
          $or: [
            { transactionType: SalaryTransactionTypeEnum.SALARY_ADVANCE },
            { transactionType: SalaryTransactionTypeEnum.SALARY_DEDUCTION },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    '$transactionType',
                    SalaryTransactionTypeEnum.SALARY_DEDUCTION,
                  ],
                },
                '$amount', // Subtract amount if deduction type
                '$amount', // Otherwise, use the original amount
              ],
            },
          },
        },
      },
    ]).exec();

    // Check if there are transactions found and calculate total amount
    let totalAmount = 0;
    if (transactions.length > 0) {
      totalAmount = transactions[0].totalAmount || 0;
    }

    return totalAmount;
  }

  private extractMonthYear(monthYear: string): [number, number] {
    const month = parseInt(monthYear.slice(0, 2), 10);
    const year = parseInt(monthYear.slice(2), 10);
    return [month, year];
  }
}
