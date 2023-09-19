import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User';
import { UserController } from './UserController';
import { UserService } from './UserService';
import { JWTStrategy } from '../../jwt/JWTStrategy';
import { AuthService } from '../AuthModule/AuthService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JWTStrategy],
})
export class UserModule {}
