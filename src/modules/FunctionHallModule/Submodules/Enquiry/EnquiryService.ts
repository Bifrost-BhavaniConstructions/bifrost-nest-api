import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EnquiryCreateWrapper } from '../../../../wrappers/EnquiryCreateWrapper';
import { Enquiry } from '../../Schemas/Enquiry';
import { EnquiryType } from '../../Schemas/EnquiryType';
import { EnquiryUpdateWrapper } from '../../../../wrappers/EnquiryUpdateWrapper';
import Estimate from '../../Schemas/SubSchemas/Estimate';
import { UpdatePaymentCreateWrapper } from '../../../../wrappers/UpdatePaymentCreateWrapper';
import { InventoryWrapper } from '../../../../wrappers/InventoryWrapper';
import { CheckInWrapper } from '../../../../wrappers/CheckInWrapper';
import FollowUp from '../../Schemas/SubSchemas/FollowUp';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectModel(Enquiry.name) private Enquiries: Model<Enquiry>,
    @InjectModel(EnquiryType.name) private EnquiryTypes: Model<EnquiryType>,
  ) {}

  async createEnquiry(
    enquiryCreateWrapper: EnquiryCreateWrapper,
  ): Promise<Enquiry> {
    const createdEnquiry = new this.Enquiries(enquiryCreateWrapper);
    return createdEnquiry.save();
  }
  async updateEnquiry(
    enquiryUpdateWrapper: EnquiryUpdateWrapper,
  ): Promise<void> {
    const existingEnquiry = await this.Enquiries.findById(
      enquiryUpdateWrapper._id,
    );

    if (!existingEnquiry) {
      throw new NotFoundException('Enquiry not found');
    }

    delete enquiryUpdateWrapper.estimates;

    const updatedEnquiry = await this.Enquiries.updateOne(
      { _id: new mongoose.Types.ObjectId(enquiryUpdateWrapper._id) },
      {
        $set: {
          ...enquiryUpdateWrapper,
        },
      },
    );

    if (!updatedEnquiry) {
      throw new InternalServerErrorException('Unable to Update Enquiry');
    }
  }

  async addEstimateToEnquiry(
    enquiryId: string,
    estimate: Estimate,
  ): Promise<void> {
    const existingEnquiry = await this.Enquiries.findById(enquiryId);

    if (!existingEnquiry) {
      throw new NotFoundException('Enquiry not found');
    }

    // Create a copy of the estimate and add it to the array
    const updatedEnquiry = await this.Enquiries.findByIdAndUpdate(
      enquiryId,
      {
        $push: {
          estimates: estimate,
        },
      },
      { new: true },
    );

    if (!updatedEnquiry) {
      throw new InternalServerErrorException(
        'Unable to add estimate to Enquiry',
      );
    }
  }

  async acceptPayment(
    id: string,
    updateDto: UpdatePaymentCreateWrapper,
  ): Promise<Enquiry> {
    const updatedEstimate = await this.Enquiries.findByIdAndUpdate(id, {
      $push: {
        payments: {
          payment: updateDto.paymentAmount,
          modeOfPayment: updateDto.modeOfPayment,
          remark: updateDto.remark,
        },
      },
      $set: {
        isCheckedOut: updateDto.isCheckedOut,
      },
    });

    if (!updatedEstimate) {
      throw new NotFoundException(`Estimate with ID ${id} not found`);
    }

    return updatedEstimate.toObject();
  }

  async addFollowUp(
    id: string,
    followUp: FollowUp,
    user: mongoose.Types.ObjectId,
  ): Promise<Enquiry> {
    console.log(user);
    const updatedEstimate = await this.Enquiries.findByIdAndUpdate(id, {
      $push: {
        followUps: {
          remark: followUp.remark,
          datetime: followUp.datetime,
          user,
        },
      },
    });

    if (!updatedEstimate) {
      throw new NotFoundException(`Estimate with ID ${id} not found`);
    }

    return updatedEstimate.toObject();
  }

  async updateBookingPayment(
    id: string,
    updateDto: UpdatePaymentCreateWrapper,
  ): Promise<Estimate> {
    const updatedEstimate = await this.Enquiries.findByIdAndUpdate(id, {
      $set: {
        bookingAmount: updateDto.paymentAmount,
        modeOfPayment: updateDto.modeOfPayment!,
        remark: updateDto.remark!,
        isBooking: true,
      },
    });

    if (!updatedEstimate) {
      throw new NotFoundException(`Estimate with ID ${id} not found`);
    }

    return updatedEstimate.toObject();
  }

  async getAllEnquiries(): Promise<Enquiry[]> {
    return this.Enquiries.find({})
      .populate('enquiryType')
      .populate('functionHall')
      .populate({
        path: 'followUps',
        populate: {
          path: 'user',
          select: 'name', // Select the 'name' field from the User model
        },
      })
      .exec();
  }
  async getAllEnquiryTypes(): Promise<EnquiryType[]> {
    return this.EnquiryTypes.find({});
  }

  //Inventory
  async updateInventory(
    id: string,
    inventoryData: InventoryWrapper[],
  ): Promise<Enquiry> {
    const updatedEnquiry = await this.Enquiries.findByIdAndUpdate(id, {
      $push: { inventory: { items: inventoryData } },
    });
    if (!updatedEnquiry) {
      throw new NotFoundException(`Estimate with ID ${id} not found`);
    }
    return updatedEnquiry;
  }

  async updateStatus(id: string, data: CheckInWrapper): Promise<Enquiry> {
    console.log(data.generators[0].sessions);
    const updatedEnquiry = await this.Enquiries.findByIdAndUpdate(id, {
      $push: {
        'statStatus.roomsAll': data.rooms,
        'statStatus.powerMetersAll': data.powerMeters,
        'statStatus.securityGuards': data.securityGuards,
        'statStatus.inventoryAll': data.inventory,
      },
      $set: {
        isCheckedIn: true,
        'statStatus.generatorsAll': data.generators,
      },
    });
    if (!updatedEnquiry) {
      throw new NotFoundException(`Estimate with ID ${id} not found`);
    }
    return updatedEnquiry;
  }
}
