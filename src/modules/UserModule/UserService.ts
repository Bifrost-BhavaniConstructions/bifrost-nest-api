import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User';
import mongoose, { Model } from 'mongoose';
import { UserCreateWrapper } from '../../wrappers/UserCreateWrapper';
import { sanitizeUser } from '../../helpers/HelperFunctions';
import { UserDTO } from '../../dtos/UserDTO';
import { RefreshAuthWrapper } from '../../wrappers/RefreshAuthWrapper';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private Users: Model<User>) {}

  async createUser(userCreateWrapper: UserCreateWrapper): Promise<UserDTO> {
    const isUserExist = await this.Users.exists({
      username: userCreateWrapper.username,
    });
    if (isUserExist) {
      throw new HttpException('Users already exists', HttpStatus.CONFLICT);
    }
    const newUser = new this.Users(userCreateWrapper);
    const savedUser = await newUser.save();
    return sanitizeUser(savedUser.toObject());
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
      _id: new mongoose.Types.ObjectId(refreshAuthWrapper.userId),
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
}
