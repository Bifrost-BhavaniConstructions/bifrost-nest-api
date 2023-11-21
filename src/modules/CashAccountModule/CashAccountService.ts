import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CashAccount } from './Schemas/CashAccount';
import { Transaction } from './Schemas/Transaction';
import { TransactionCreateWrapper } from '../../wrappers/TransactionCreateWrapper';
import { EnquiryType } from '../FunctionHallModule/Schemas/EnquiryType';
import { TransactionPurpose } from './Schemas/TransactionPurpose';

@Injectable()
export class CashAccountService {
  constructor(
    @InjectModel(CashAccount.name) private CashAccounts: Model<CashAccount>,
    @InjectModel(Transaction.name) private Transactions: Model<Transaction>,
    @InjectModel(TransactionPurpose.name)
    private TransactionPurposes: Model<TransactionPurpose>,
  ) {}

  async createCashAccount(userId: string): Promise<CashAccount> {
    const cashAccountExists = await this.CashAccounts.exists({
      user: userId,
    });
    if (cashAccountExists) {
      throw new HttpException(
        'Cash Account already exists',
        HttpStatus.CONFLICT,
      );
    }
    const cashAccount = new this.CashAccounts({
      user: new mongoose.Types.ObjectId(userId),
      balance: 0,
    });
    return await cashAccount.save();
  }

  async getCashAccount(userId: string): Promise<CashAccount> {
    const cashAccount = await this.CashAccounts.findOne({
      user: userId,
    })
      .populate('user')
      .lean()
      .exec();

    if (!cashAccount) {
      throw new NotFoundException(`Cash Account Not Found`);
    }

    return cashAccount;
  }

  async addTransaction(
    transactionCreateWrapper: TransactionCreateWrapper,
  ): Promise<Transaction> {
    const session = await this.Transactions.startSession();
    try {
      session.startTransaction();
      if (transactionCreateWrapper.from) {
        const fromUser = await this.CashAccounts.findOneAndUpdate(
          { user: transactionCreateWrapper.from },
          { $inc: { balance: -transactionCreateWrapper.amount } }, // Decrease the balance
          { session },
        ).exec();
        if (!fromUser) {
          throw new NotFoundException(`Cash Account Not Found`);
        }
        transactionCreateWrapper.from = fromUser._id.toString();
        transactionCreateWrapper.fromBalance =
          Number(fromUser.balance) - Number(transactionCreateWrapper.amount);
      }

      // Update the 'to' account
      if (transactionCreateWrapper.to) {
        const toUser = await this.CashAccounts.findOneAndUpdate(
          { user: transactionCreateWrapper.to },
          { $inc: { balance: transactionCreateWrapper.amount } }, // Increase the balance
          { session },
        ).exec();

        if (!toUser) {
          throw new NotFoundException(`Cash Account Not Found`);
        }
        transactionCreateWrapper.to = toUser._id.toString();
        transactionCreateWrapper.toBalance =
          Number(toUser.balance) + Number(transactionCreateWrapper.amount);
      }

      const transaction = new this.Transactions(transactionCreateWrapper);
      await transaction.save({ session });

      await session.commitTransaction();
      await session.endSession();
      return transaction;
    } catch (e) {
      await session.abortTransaction();
      await session.endSession();
      throw e;
    }
  }

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    const account = await this.CashAccounts.findOne({
      user: new mongoose.Types.ObjectId(userId),
    }).exec();

    return await this.Transactions.find({
      $or: [
        { from: new mongoose.Types.ObjectId(account?._id) },
        { to: new mongoose.Types.ObjectId(account?._id) },
      ],
    })
      .populate({ path: 'from', populate: { path: 'user' } })
      .populate({ path: 'to', populate: { path: 'user' } })
      .populate({
        path: 'transactionPurpose',
        select: 'name',
      })
      .populate({ path: 'site', select: 'name' })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getAllTransactionPurposes(): Promise<TransactionPurpose[]> {
    return this.TransactionPurposes.find({});
  }
}
