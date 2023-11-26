import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { PurchaseRequestService } from './PurchaseRequestService';
import { PurchaseRequest } from './Schemas/PurchaseRequest';
import { PurchaseRequestCreateWrapper } from '../../wrappers/PurchaseRequestCreateWrapper';

@Controller('/site-management/purchase-request')
export class PurchaseRequestController {
  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
  ) {}

  @Post('/')
  async createPR(
    @Body() requestData: PurchaseRequestCreateWrapper,
  ): Promise<PurchaseRequest> {
    return this.purchaseRequestService.createPR(requestData);
  }

  @Post('/approve/:prId')
  async approvePR(
    @Param('prId') prId: string,
    @Body() approveData: { approvalRemarks: string; approved: boolean },
  ): Promise<PurchaseRequest | null> {
    return this.purchaseRequestService.approvePR(prId, approveData);
  }

  @Post('/confirm/:prId')
  async confirmPR(
    @Param('prId') prId: string,
    @Body()
    confirmationData: {
      confirmationRemarks: string;
      chequeNumber: string;
      utrNumber: string;
      confirmed: boolean;
    },
  ): Promise<PurchaseRequest | null> {
    return this.purchaseRequestService.confirmPR(
      prId,
      confirmationData.confirmationRemarks,
      confirmationData.chequeNumber,
      confirmationData.utrNumber,
      confirmationData.confirmed,
    );
  }

  @Get('/approver/:approverId')
  async getAllPRsByApprover(
    @Param('approverId') approverId: string,
  ): Promise<PurchaseRequest[]> {
    return this.purchaseRequestService.getAllPRsByApprover(approverId);
  }

  @Get('/created-by/:createdBy')
  async getAllPRsRaisedByMe(
    @Param('createdBy') createdBy: string,
  ): Promise<PurchaseRequest[]> {
    return this.purchaseRequestService.getAllPRsRaisedByMe(createdBy);
  }

  @Delete('/:prId')
  async deletePR(@Param('prId') prId: string): Promise<PurchaseRequest | null> {
    return this.purchaseRequestService.deletePR(prId);
  }
}
