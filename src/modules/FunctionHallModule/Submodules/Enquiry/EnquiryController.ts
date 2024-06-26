import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnquiryService } from './EnquiryService';
import { EnquiryCreateWrapper } from '../../../../wrappers/EnquiryCreateWrapper';
import { UserRoleEnum } from '../../../../enums/UserRoleEnum';
import { Roles } from '../../../../decorators/Roles';
import { JWTGuard } from '../../../../guards/JWTGuard';
import { RoleGuard } from '../../../../guards/RoleGuard';
import { Enquiry } from '../../Schemas/Enquiry';
import { EnquiryType } from '../../Schemas/EnquiryType';
import { EnquiryUpdateWrapper } from '../../../../wrappers/EnquiryUpdateWrapper';
import { Response } from 'express';
import Estimate from '../../Schemas/SubSchemas/Estimate';
import { UpdatePaymentCreateWrapper } from '../../../../wrappers/UpdatePaymentCreateWrapper';
import { InventoryWrapper } from '../../../../wrappers/InventoryWrapper';
import { CheckInWrapper } from '../../../../wrappers/CheckInWrapper';
import FollowUp from '../../Schemas/SubSchemas/FollowUp';
import { User } from '../../../UserModule/User';

@Controller('/function-hall/enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Post('/')
  @UseGuards(JWTGuard)
  createEnquiry(
    @Body() enquiryCreateWrapper: EnquiryCreateWrapper,
  ): Promise<Enquiry> {
    return this.enquiryService.createEnquiry(enquiryCreateWrapper);
  }

  @Put('/')
  @UseGuards(JWTGuard)
  async updateEnquiry(
    @Body() enquiryUpdateWrapper: EnquiryUpdateWrapper,
    @Res() res: Response,
  ): Promise<Response> {
    await this.enquiryService.updateEnquiry(enquiryUpdateWrapper);
    return res.sendStatus(200);
  }

  @Get('/')
  @UseGuards(JWTGuard)
  async getEnquiry(): Promise<Enquiry[]> {
    return await this.enquiryService.getAllEnquiries();
  }

  @Get('/enquiry-types')
  @UseGuards(JWTGuard)
  async getEnquiryTypes(): Promise<EnquiryType[]> {
    return await this.enquiryService.getAllEnquiryTypes();
  }

  @Post('/estimate/:enquiryId/')
  async addEstimateToEnquiry(
    @Param('enquiryId') enquiryId: string,
    @Body() estimate: Estimate,
    @Res() res: Response,
  ) {
    await this.enquiryService.addEstimateToEnquiry(enquiryId, estimate);
    return res.sendStatus(200);
  }

  @Post('/booking/:enquiryId')
  async updateBookingPayment(
    @Param('enquiryId') enquiryId: string,
    @Body()
    updateBookingPaymentCreateWrapper: UpdatePaymentCreateWrapper,
    @Res() res: Response,
  ) {
    await this.enquiryService.updateBookingPayment(
      enquiryId,
      updateBookingPaymentCreateWrapper,
    );
    return res.sendStatus(200);
  }
  @Post('/payment/:enquiryId')
  async acceptPayment(
    @Param('enquiryId') enquiryId: string,
    @Body()
    updateBookingPaymentCreateWrapper: UpdatePaymentCreateWrapper,
    @Res() res: Response,
  ) {
    await this.enquiryService.acceptPayment(
      enquiryId,
      updateBookingPaymentCreateWrapper,
    );
    return res.sendStatus(200);
  }
  @Post('/followup/:enquiryId')
  @UseGuards(JWTGuard)
  async addFollowUp(
    @Param('enquiryId') enquiryId: string,
    @Body()
    followUp: FollowUp,
    @Res() res: Response,
    @Req() req: any,
  ) {
    const user = req.user as User;
    await this.enquiryService.addFollowUp(enquiryId, followUp, user._id);
    return res.sendStatus(200);
  }
  @Post('/inventory/:enquiryId')
  async updateInventory(
    @Param('enquiryId') enquiryId: string,
    @Body() inventoryData: InventoryWrapper[],
    @Res() res: Response,
  ) {
    await this.enquiryService.updateInventory(enquiryId, inventoryData);
    return res.sendStatus(200);
  }
  @Post('/update-status/:enquiryId')
  async checkIn(
    @Param('enquiryId') enquiryId: string,
    @Body() checkInWrapper: CheckInWrapper,
    @Res() res: Response,
  ) {
    await this.enquiryService.updateStatus(enquiryId, checkInWrapper);
    return res.sendStatus(200);
  }
  @Post('/close-enquiry/:enquiryId')
  async closeEnquiry(
    @Param('enquiryId') enquiryId: string,
    @Body() closeWrapper: { reason: string; refundAmount: number },
    @Res() res: Response,
  ) {
    await this.enquiryService.closeEnquiry(enquiryId, closeWrapper);
    return res.sendStatus(200);
  }
  @Post('/restore-enquiry/:enquiryId')
  async restoreEnquiry(
    @Param('enquiryId') enquiryId: string,
    @Res() res: Response,
  ) {
    await this.enquiryService.restoreEnquiry(enquiryId);
    return res.sendStatus(200);
  }
}
