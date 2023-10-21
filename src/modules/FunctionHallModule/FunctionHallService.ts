import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { FunctionHall } from './Schemas/FunctionHall';
import { FunctionHallCreateWrapper } from '../../wrappers/FunctionHallCreateWrapper';
import { EnquiryCreateWrapper } from '../../wrappers/EnquiryCreateWrapper';
import { Enquiry } from './Schemas/Enquiry';
import { InventoryWrapper } from '../../wrappers/InventoryWrapper';

@Injectable()
export class FunctionHallService {
  constructor(
    @InjectModel(FunctionHall.name) private FunctionHalls: Model<FunctionHall>,
    @InjectModel(Enquiry.name) private Enquiries: Model<Enquiry>,
  ) {}

  async createFunctionHall(
    functionHallCreateWrapper: FunctionHallCreateWrapper,
  ): Promise<FunctionHall> {
    const functionHallExists = await this.FunctionHalls.exists({
      name: functionHallCreateWrapper.name,
    });
    if (functionHallExists) {
      throw new HttpException(
        'Function Hall already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newFunctionHall = new this.FunctionHalls(functionHallCreateWrapper);
    return await newFunctionHall.save();
  }

  async updateFunctionHall(
    functionHallCreateWrapper: FunctionHallCreateWrapper,
  ): Promise<FunctionHall> {
    if (!functionHallCreateWrapper._id) {
      throw new HttpException(
        "Function Hall doesn't exists",
        HttpStatus.NOT_FOUND,
      );
    }
    const functionHallExists = await this.FunctionHalls.findById(
      functionHallCreateWrapper._id,
    );
    if (!functionHallExists) {
      throw new HttpException(
        "Function Hall doesn't exists",
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedFunctionHall = await this.FunctionHalls.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(functionHallCreateWrapper._id),
      },
      functionHallCreateWrapper,
    );
    if (!updatedFunctionHall) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedFunctionHall.toObject();
  }

  async getAllFunctionHalls(): Promise<FunctionHall[]> {
    return this.FunctionHalls.find({});
  }
}
