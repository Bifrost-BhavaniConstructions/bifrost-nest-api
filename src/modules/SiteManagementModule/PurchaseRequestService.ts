import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseRequest } from './Schemas/PurchaseRequest';
import { PurchaseRequestCreateWrapper } from '../../wrappers/PurchaseRequestCreateWrapper';
import { PurchaseRequestStatusEnum } from '../../enums/PurchaseRequestStatusEnum';

@Injectable()
export class PurchaseRequestService {
  constructor(
    @InjectModel(PurchaseRequest.name)
    private PurchaseRequests: Model<PurchaseRequest>,
  ) {}

  async createPR(
    requestData: PurchaseRequestCreateWrapper,
  ): Promise<PurchaseRequest> {
    try {
      return await this.PurchaseRequests.create({
        ...requestData,
        status: PurchaseRequestStatusEnum.CREATED,
      });
    } catch (error) {
      throw new Error('Failed to create Purchase Request');
    }
  }

  async approvePR(
    prId: string,
    approvalData: { approvalRemarks: string; approved: boolean },
  ): Promise<PurchaseRequest | null> {
    try {
      const prToUpdate = await this.PurchaseRequests.findByIdAndUpdate(
        prId,
        {
          approvalRemarks: approvalData.approvalRemarks,
          approvedAt: new Date(),
          status: approvalData.approved
            ? PurchaseRequestStatusEnum.APPROVED
            : PurchaseRequestStatusEnum.APPROVED_DENIED, // Assuming 'APPROVED' is a status in your enum
        },
        { new: true },
      );

      return prToUpdate;
    } catch (error) {
      throw new Error('Failed to approve Purchase Request');
    }
  }

  async confirmPR(
    prId: string,
    confirmationRemarks: string,
    chequeNumber: string,
    utrNumber: string,
    confirmed: boolean,
  ): Promise<PurchaseRequest | null> {
    try {
      const prToUpdate = await this.PurchaseRequests.findByIdAndUpdate(prId, {
        confirmationRemarks,
        chequeNumber,
        utrNumber,
        confirmedAt: new Date(),
        status: confirmed
          ? PurchaseRequestStatusEnum.CONFIRMED
          : PurchaseRequestStatusEnum.CONFIRMED_DENIED,
      });
      return prToUpdate;
    } catch (error) {
      throw new Error('Failed to confirm Purchase Request');
    }
  }

  async getAllPRsByApprover(approverId: string): Promise<PurchaseRequest[]> {
    try {
      const prs = await this.PurchaseRequests.find({
        approver: approverId,
      })
        .populate({ path: 'createdBy', select: 'name' })
        .populate({ path: 'approver', select: 'name' })
        .exec();

      return prs;
    } catch (error) {
      throw new Error('Failed to get Purchase Requests by Approver');
    }
  }

  async getAllPRsRaisedByMe(createdBy: string): Promise<PurchaseRequest[]> {
    try {
      const prs = await this.PurchaseRequests.find({ createdBy })
        .populate({ path: 'createdBy', select: 'name' })
        .populate({ path: 'approver', select: 'name' })
        .exec();

      return prs;
    } catch (error) {
      throw new Error('Failed to get Purchase Requests raised by the user');
    }
  }

  async deletePR(prId: string): Promise<PurchaseRequest | null> {
    try {
      return await this.PurchaseRequests.findByIdAndDelete(prId);
    } catch (error) {
      throw new NotFoundException('Purchase Request not found');
    }
  }
}
