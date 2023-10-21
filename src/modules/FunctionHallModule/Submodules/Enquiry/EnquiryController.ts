import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
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

@Controller('/function-hall/enquiry')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/')
  @UseGuards(JWTGuard, RoleGuard)
  createEnquiry(
    @Body() enquiryCreateWrapper: EnquiryCreateWrapper,
  ): Promise<Enquiry> {
    return this.enquiryService.createEnquiry(enquiryCreateWrapper);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Put('/')
  @UseGuards(JWTGuard, RoleGuard)
  async updateEnquiry(
    @Body() enquiryUpdateWrapper: EnquiryUpdateWrapper,
    @Res() res: Response,
  ): Promise<Response> {
    await this.enquiryService.updateEnquiry(enquiryUpdateWrapper);
    return res.sendStatus(200);
  }
  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/')
  @UseGuards(JWTGuard, RoleGuard)
  async getEnquiry(): Promise<Enquiry[]> {
    return await this.enquiryService.getAllEnquiries();
  }
  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/enquiry-types')
  @UseGuards(JWTGuard, RoleGuard)
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
  @Post('/inventory/:enquiryId')
  async updateInventory(
    @Param('enquiryId') enquiryId: string,
    @Body() inventoryData: InventoryWrapper[],
    @Res() res: Response,
  ) {
    await this.enquiryService.updateInventory(enquiryId, inventoryData);
    return res.sendStatus(200);
  }
  @Post('/check-in/:enquiryId')
  async checkIn(
    @Param('enquiryId') enquiryId: string,
    @Body() checkInWrapper: CheckInWrapper,
    @Res() res: Response,
  ) {
    await this.enquiryService.checkIn(enquiryId, checkInWrapper);
    return res.sendStatus(200);
  }
}
