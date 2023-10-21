import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FunctionHallController } from './FunctionHallController';
import { FunctionHallService } from './FunctionHallService';
import { JWTStrategy } from '../../jwt/JWTStrategy';
import { AuthService } from '../AuthModule/AuthService';
import { FunctionHall, FunctionHallSchema } from './Schemas/FunctionHall';
import { UserService } from '../UserModule/UserService';
import { User, UserSchema } from '../UserModule/User';
import { Enquiry, EnquirySchema } from './Schemas/Enquiry';
import { EnquiryType, EnquiryTypeSchema } from './Schemas/EnquiryType';
import { Muhurtam, MuhurtamSchema } from './Schemas/Muhurtam';
import { EnquiryController } from './Submodules/Enquiry/EnquiryController';
import { EnquiryService } from './Submodules/Enquiry/EnquiryService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: FunctionHall.name, schema: FunctionHallSchema },
      { name: Enquiry.name, schema: EnquirySchema },
      { name: EnquiryType.name, schema: EnquiryTypeSchema },
      { name: Muhurtam.name, schema: MuhurtamSchema },
    ]),
  ],
  controllers: [FunctionHallController, EnquiryController],
  providers: [
    FunctionHallService,
    AuthService,
    UserService,
    EnquiryService,
    JWTStrategy,
  ],
})
export class FunctionHallModule {}
