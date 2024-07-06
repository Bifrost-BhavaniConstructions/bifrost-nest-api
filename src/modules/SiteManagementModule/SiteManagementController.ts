import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JWTGuard } from '../../guards/JWTGuard';
import { RoleGuard } from '../../guards/RoleGuard';
import { SiteManagementService } from './SiteManagementService';
import { SiteCreateWrapper } from '../../wrappers/SiteCreateWrapper';
import { Site } from './Schemas/Site';
import { SiteUpdateWrapper } from '../../wrappers/SiteUpdateWrapper';
import { Vehicle } from './Schemas/Vehicle';
import { VehicleCreateWrapper } from '../../wrappers/VehicleCreateWrapper';
import { Phone } from './Schemas/Phone';
import { Card } from './Schemas/Card';
import { AssetAssignWrapper } from '../../wrappers/AssetAssignWrapper';

@Controller('/site-management')
export class SiteManagementController {
  constructor(private readonly siteManagementService: SiteManagementService) {}

  @Post('/')
  @UseGuards(JWTGuard, RoleGuard)
  createSite(@Body() siteCreateWrapper: SiteCreateWrapper): Promise<Site> {
    return this.siteManagementService.createSite(siteCreateWrapper);
  }

  @Put('/')
  @UseGuards(JWTGuard, RoleGuard)
  updateSite(@Body() siteUpdateWrapper: SiteUpdateWrapper): Promise<Site> {
    return this.siteManagementService.updateSite(siteUpdateWrapper);
  }

  @Delete('/delete/:siteId')
  @UseGuards(JWTGuard, RoleGuard)
  deleteSite(@Param('siteId') siteId: string): Promise<void> {
    return this.siteManagementService.deleteSite(siteId);
  }

  @Get('/')
  @UseGuards(JWTGuard, RoleGuard)
  getSites(): Promise<Site[]> {
    return this.siteManagementService.getAllSites();
  }

  //Vehicle

  @Post('/vehicle/assign')
  @UseGuards(JWTGuard, RoleGuard)
  assignVehicle(
    @Body() vehicleAssignWrapper: AssetAssignWrapper,
  ): Promise<Vehicle> {
    return this.siteManagementService.assignVehicle(vehicleAssignWrapper);
  }

  @Post('/vehicle')
  @UseGuards(JWTGuard, RoleGuard)
  createVehicle(@Body() vehicle: VehicleCreateWrapper): Promise<Vehicle> {
    return this.siteManagementService.createVehicle(vehicle);
  }

  @Put('/vehicle')
  @UseGuards(JWTGuard, RoleGuard)
  updateVehicle(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.siteManagementService.updateVehicle(vehicle);
  }

  @Get('/vehicle')
  @UseGuards(JWTGuard, RoleGuard)
  getVehicles(): Promise<Vehicle[]> {
    return this.siteManagementService.getAllVehicles();
  }

  //Phone

  @Post('/phone/assign')
  @UseGuards(JWTGuard, RoleGuard)
  assignPhone(@Body() phoneAssignWrapper: AssetAssignWrapper): Promise<Phone> {
    return this.siteManagementService.assignPhone(phoneAssignWrapper);
  }

  @Post('/phone')
  @UseGuards(JWTGuard, RoleGuard)
  createPhone(@Body() phone: Phone): Promise<Phone> {
    return this.siteManagementService.createPhone(phone);
  }

  @Put('/phone')
  @UseGuards(JWTGuard, RoleGuard)
  updatePhone(@Body() phone: Phone): Promise<Phone> {
    return this.siteManagementService.updatePhone(phone);
  }

  @Get('/phone')
  @UseGuards(JWTGuard, RoleGuard)
  getPhones(): Promise<Phone[]> {
    return this.siteManagementService.getAllPhones();
  }

  //Card

  @Post('/card/assign')
  @UseGuards(JWTGuard, RoleGuard)
  assignCards(@Body() cardAssignWrapper: AssetAssignWrapper): Promise<Card> {
    return this.siteManagementService.assignCard(cardAssignWrapper);
  }

  @Post('/card')
  @UseGuards(JWTGuard, RoleGuard)
  createCard(@Body() card: Card): Promise<Card> {
    return this.siteManagementService.createCard(card);
  }

  @Put('/card')
  @UseGuards(JWTGuard, RoleGuard)
  updateCard(@Body() card: Card): Promise<Card> {
    return this.siteManagementService.updateCard(card);
  }

  @Get('/card')
  @UseGuards(JWTGuard, RoleGuard)
  getCards(): Promise<Card[]> {
    return this.siteManagementService.getAllCards();
  }

  @Get('/all-assets/:userId')
  @UseGuards(JWTGuard, RoleGuard)
  getAssetsOfUser(
    @Param('userId') userId: string,
  ): Promise<{ cards: Card[]; phones: Phone[]; vehicles: Vehicle[] }> {
    return this.siteManagementService.getAssetsOfUser(userId);
  }
}
