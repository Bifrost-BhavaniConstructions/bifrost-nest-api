import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Site } from './Schemas/Site';
import { SiteCreateWrapper } from '../../wrappers/SiteCreateWrapper';
import { SiteUpdateWrapper } from '../../wrappers/SiteUpdateWrapper';
import { Vehicle } from './Schemas/Vehicle';
import { VehicleCreateWrapper } from '../../wrappers/VehicleCreateWrapper';
import { Phone } from './Schemas/Phone';
import { Card } from './Schemas/Card';
import { AssetAssignment } from './Schemas/SubSchemas/AssetAssignment';
import { AssetAssignWrapper } from '../../wrappers/AssetAssignWrapper';
import { User } from '../UserModule/User';

@Injectable()
export class SiteManagementService {
  constructor(
    @InjectModel(Site.name) private Sites: Model<Site>,
    @InjectModel(User.name) private Users: Model<User>,
    @InjectModel(Vehicle.name) private Vehicles: Model<Vehicle>,
    @InjectModel(Phone.name) private Phones: Model<Phone>,
    @InjectModel(Card.name) private Cards: Model<Card>,
  ) {}

  async getAllSites(): Promise<Site[]> {
    return this.Sites.find();
  }
  async createSite(siteCreateWrapper: SiteCreateWrapper): Promise<Site> {
    return new this.Sites({ ...siteCreateWrapper }).save();
  }
  async updateSite(siteUpdateWrapper: SiteUpdateWrapper): Promise<Site> {
    const updatedFunctionHall = await this.Sites.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(siteUpdateWrapper._id),
      },
      siteUpdateWrapper,
    );
    if (!updatedFunctionHall) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedFunctionHall.toObject();
  }

  //Vehicles

  async assignVehicle(
    vehicleAssignWrapper: AssetAssignWrapper,
  ): Promise<Vehicle> {
    const vehicle = await this.Vehicles.findById(
      vehicleAssignWrapper.assetId,
    ).exec();

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    const user = await this.Users.findById(vehicleAssignWrapper.userId).exec();

    if (!user) {
      throw new Error('User not found');
    }

    // Save the current assignedTo user to assignmentHistory
    const assignment: AssetAssignment = {
      assignedTo: user,
    };
    vehicle.assignmentHistory.push(assignment);

    // Update assignedTo with the fetched user object
    vehicle.assignedTo = user;

    return vehicle.save();
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return this.Vehicles.find()
      .populate({
        path: 'assignedTo',
        select: 'name',
      })
      .populate({
        path: 'assignmentHistory.assignedTo',
        select: 'name',
      });
  }
  async createVehicle(vehicle: VehicleCreateWrapper): Promise<Vehicle> {
    return new this.Vehicles({ ...vehicle }).save();
  }
  async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const updatedVehicle = await this.Vehicles.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(vehicle._id),
      },
      vehicle,
    );
    if (!updatedVehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }
    return updatedVehicle.toObject();
  }

  //Phones

  async assignPhone(phoneAssignWrapper: AssetAssignWrapper): Promise<Phone> {
    const phone = await this.Phones.findById(phoneAssignWrapper.assetId).exec();

    if (!phone) {
      throw new Error('Phone not found');
    }
    const user = await this.Users.findById(phoneAssignWrapper.userId).exec();

    if (!user) {
      throw new Error('User not found');
    }

    // Save the current assignedTo user to assignmentHistory
    const assignment: AssetAssignment = {
      assignedTo: user,
    };
    phone.assignmentHistory.push(assignment);

    // Update assignedTo with the fetched user object
    phone.assignedTo = user;

    return phone.save();
  }
  async getAllPhones(): Promise<Phone[]> {
    return this.Phones.find()
      .populate({
        path: 'assignedTo',
        select: 'name',
      })
      .populate({
        path: 'assignmentHistory.assignedTo',
        select: 'name',
      });
  }
  async createPhone(phone: Phone): Promise<Phone> {
    return new this.Phones({ ...phone }).save();
  }
  async updatePhone(phone: Phone): Promise<Phone> {
    const updatedPhone = await this.Phones.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(phone._id),
      },
      phone,
    );
    if (!updatedPhone) {
      throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
    }
    return updatedPhone.toObject();
  }

  //Cards

  async assignCard(cardAssignWrapper: AssetAssignWrapper): Promise<Card> {
    const card = await this.Cards.findById(cardAssignWrapper.assetId).exec();

    if (!card) {
      throw new Error('Card not found');
    }

    const user = await this.Users.findById(cardAssignWrapper.userId).exec();

    if (!user) {
      throw new Error('User not found');
    }

    // Save the current assignedTo user to assignmentHistory
    const assignment: AssetAssignment = {
      assignedTo: user,
    };
    card.assignmentHistory.push(assignment);

    // Update assignedTo with the fetched user object
    card.assignedTo = user;

    return card.save();
  }
  async getAllCards(): Promise<Card[]> {
    return this.Cards.find()
      .populate({
        path: 'assignedTo',
        select: 'name',
      })
      .populate({
        path: 'assignmentHistory.assignedTo',
        select: 'name',
      });
  }
  async createCard(card: Card): Promise<Card> {
    return new this.Cards({ ...card }).save();
  }
  async updateCard(card: Card): Promise<Card> {
    const updatedCard = await this.Cards.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(card._id),
      },
      card,
    );
    if (!updatedCard) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }
    return updatedCard.toObject();
  }
}
