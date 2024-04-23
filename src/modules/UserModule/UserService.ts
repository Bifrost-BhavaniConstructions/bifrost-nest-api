import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User';
import mongoose, { Model } from 'mongoose';
import { UserCreateWrapper } from '../../wrappers/UserCreateWrapper';
import { sanitizeUser } from '../../helpers/HelperFunctions';
import { UserDTO } from '../../dtos/UserDTO';
import { RefreshAuthWrapper } from '../../wrappers/RefreshAuthWrapper';
import { UserRoleEnum } from '../../enums/UserRoleEnum';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CashAccountService } from '../CashAccountModule/CashAccountService';
import { AttendanceService } from '../SiteManagementModule/AttendanceService';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private Users: Model<User>,
    private readonly cashAccountService: CashAccountService,
    private readonly attendanceService: AttendanceService,
  ) {}

  async createUser(userCreateWrapper: UserCreateWrapper): Promise<UserDTO> {
    if (
      ![
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.FH_MANAGER,
        UserRoleEnum.SUPERVISOR,
      ].includes(userCreateWrapper.role)
    ) {
      const uid = uuidv4();
      userCreateWrapper.username = uid;
      userCreateWrapper.password = uid;
    }
    const isUserExist = await this.Users.exists({
      username: userCreateWrapper.username,
    });
    if (isUserExist) {
      throw new HttpException('Users already exists', HttpStatus.CONFLICT);
    }
    const newUser = new this.Users(userCreateWrapper);
    const savedUser = await newUser.save();
    await this.cashAccountService.createCashAccount(savedUser._id.toString());
    await this.attendanceService.createAttendanceAccount(
      savedUser._id.toString(),
    );
    return sanitizeUser(savedUser.toObject());
  }
  async updateUser(userCreateWrapper: UserCreateWrapper): Promise<UserDTO> {
    const isUserExist = await this.Users.exists({
      username: userCreateWrapper.username,
    });
    if (!isUserExist) {
      throw new HttpException("User doesn't exist", HttpStatus.CONFLICT);
    }
    const updateData: Partial<UserCreateWrapper> = { ...userCreateWrapper };
    if (!userCreateWrapper.password) {
      delete updateData.password;
    } else {
      updateData.password = await bcrypt.hash(userCreateWrapper.password, 10);
    }
    const updatedUser = await this.Users.findOneAndUpdate(
      { username: userCreateWrapper.username },
      updateData,
      { new: true },
    );
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return sanitizeUser(updatedUser.toObject());
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.Users.findOne({ username });
    if (user) {
      return user;
    }
    throw new HttpException("Users doesn't exist", HttpStatus.BAD_REQUEST);
  }

  async findUserById(_id: mongoose.Types.ObjectId): Promise<User> {
    const user = await this.Users.findById(_id);
    if (user) {
      return user.toObject();
    }
    throw new HttpException("Users doesn't exist", HttpStatus.BAD_REQUEST);
  }

  async findUserByRefreshToken(
    refreshAuthWrapper: RefreshAuthWrapper,
  ): Promise<User | null> {
    return this.Users.findOne({
      refreshToken: refreshAuthWrapper.refreshToken,
    });
  }

  async updateRefreshTokenForUser(
    userId: mongoose.Types.ObjectId,
    refreshToken: string,
  ): Promise<boolean> {
    const result = await this.Users.updateOne(
      { _id: userId },
      {
        $set: {
          refreshToken: refreshToken,
        },
      },
    );
    return !!result;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const allUsers = await this.Users.find({});
    return allUsers.map((user) => sanitizeUser(user.toObject()));
  }
}
