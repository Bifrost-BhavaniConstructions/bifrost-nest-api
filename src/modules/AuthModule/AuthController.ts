import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/modules/UserModule/UserService';
import { AuthService } from 'src/modules/AuthModule/AuthService';
import { LoginWrapper } from 'src/wrappers/LoginWrapper';
import { RefreshAuthWrapper } from '../../wrappers/RefreshAuthWrapper';
import { JWTGuard } from '../../guards/JWTGuard';
import { ReqUser } from '../../decorators/ReqUser';
import { User } from '../UserModule/User';

@Controller('/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Body() loginWrapper: LoginWrapper) {
    return await this.authService.getTokenForUser(loginWrapper);
  }

  @Get('/login-with-token')
  @UseGuards(JWTGuard)
  async loginWithToken(@ReqUser() user: User) {
    return user;
  }

  @Post('/refresh')
  async refreshLoginToken(@Body() refreshAuthWrapper: RefreshAuthWrapper) {
    return await this.authService.getTokenForRefresh(refreshAuthWrapper);
  }

  @Get('/pulse')
  @UseGuards(JWTGuard)
  pulse() {
    return { status: HttpStatus.OK };
  }
}
