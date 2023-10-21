import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/UserModule/UserModule';
import { AuthModule } from './modules/AuthModule/AuthModule';
import { HealthModule } from './modules/HealthModule/HealthModule';
import { FunctionHallModule } from './modules/FunctionHallModule/FunctionHallModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_CONN_STRING'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    HealthModule,
    FunctionHallModule,
  ],
})
export class AppModule {}
