import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../decorators/Roles';
import { UserRoleEnum } from '../../enums/UserRoleEnum';
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

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/')
  @UseGuards(JWTGuard, RoleGuard)
  createSite(@Body() siteCreateWrapper: SiteCreateWrapper): Promise<Site> {
    return this.siteManagementService.createSite(siteCreateWrapper);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Put('/')
  @UseGuards(JWTGuard, RoleGuard)
  updateSite(@Body() siteUpdateWrapper: SiteUpdateWrapper): Promise<Site> {
    return this.siteManagementService.updateSite(siteUpdateWrapper);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/')
  @UseGuards(JWTGuard, RoleGuard)
  getSites(): Promise<Site[]> {
    return this.siteManagementService.getAllSites();
  }

  //Vehicle

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/vehicle/assign')
  @UseGuards(JWTGuard, RoleGuard)
  assignVehicle(
    @Body() vehicleAssignWrapper: AssetAssignWrapper,
  ): Promise<Vehicle> {
    return this.siteManagementService.assignVehicle(vehicleAssignWrapper);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/vehicle')
  @UseGuards(JWTGuard, RoleGuard)
  createVehicle(@Body() vehicle: VehicleCreateWrapper): Promise<Vehicle> {
    return this.siteManagementService.createVehicle(vehicle);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Put('/vehicle')
  @UseGuards(JWTGuard, RoleGuard)
  updateVehicle(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.siteManagementService.updateVehicle(vehicle);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/vehicle')
  @UseGuards(JWTGuard, RoleGuard)
  getVehicles(): Promise<Vehicle[]> {
    return this.siteManagementService.getAllVehicles();
  }

  //Phone

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/phone/assign')
  @UseGuards(JWTGuard, RoleGuard)
  assignPhone(@Body() phoneAssignWrapper: AssetAssignWrapper): Promise<Phone> {
    return this.siteManagementService.assignPhone(phoneAssignWrapper);
  }
  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/phone')
  @UseGuards(JWTGuard, RoleGuard)
  createPhone(@Body() phone: Phone): Promise<Phone> {
    return this.siteManagementService.createPhone(phone);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Put('/phone')
  @UseGuards(JWTGuard, RoleGuard)
  updatePhone(@Body() phone: Phone): Promise<Phone> {
    return this.siteManagementService.updatePhone(phone);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/phone')
  @UseGuards(JWTGuard, RoleGuard)
  getPhones(): Promise<Phone[]> {
    return this.siteManagementService.getAllPhones();
  }

  //Card

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/card/assign')
  @UseGuards(JWTGuard, RoleGuard)
  assignCards(@Body() cardAssignWrapper: AssetAssignWrapper): Promise<Card> {
    return this.siteManagementService.assignCard(cardAssignWrapper);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('/card')
  @UseGuards(JWTGuard, RoleGuard)
  createCard(@Body() card: Card): Promise<Card> {
    return this.siteManagementService.createCard(card);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Put('/card')
  @UseGuards(JWTGuard, RoleGuard)
  updateCard(@Body() card: Card): Promise<Card> {
    return this.siteManagementService.updateCard(card);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/card')
  @UseGuards(JWTGuard, RoleGuard)
  getCards(): Promise<Card[]> {
    return this.siteManagementService.getAllCards();
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('/all-assets/:userId')
  @UseGuards(JWTGuard, RoleGuard)
  getAssetsOfUser(
    @Param('userId') userId: string,
  ): Promise<{ cards: Card[]; phones: Phone[]; vehicles: Vehicle[] }> {
    return this.siteManagementService.getAssetsOfUser(userId);
  }
}
