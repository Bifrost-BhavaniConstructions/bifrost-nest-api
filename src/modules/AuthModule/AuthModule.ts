import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { UserService } from '../UserModule/UserService';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../UserModule/User';
import { JWTStrategy } from '../../jwt/JWTStrategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JWTStrategy],
})
export class AuthModule {}
