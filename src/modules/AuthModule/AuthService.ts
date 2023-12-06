import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JWTPayload } from 'src/types/JWTPayload';
import { decode, JwtPayload, sign } from 'jsonwebtoken';
import { UserService } from '../UserModule/UserService';
import { LoginWrapper } from '../../wrappers/LoginWrapper';
import * as bcrypt from 'bcrypt';
import { RefreshAuthWrapper } from '../../wrappers/RefreshAuthWrapper';
import * as dayjs from 'dayjs';
import { User } from '../UserModule/User';
import mongoose from 'mongoose';
import { sanitizeUser } from '../../helpers/HelperFunctions';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: JWTPayload) {
    return {
      token: sign(payload, process.env.SECRET_KEY!, {
        expiresIn: '7d',
      }),
      refreshToken: sign(payload, process.env.SECRET_KEY!, {
        expiresIn: '14d',
      }),
    };
  }

  async signJWTAndReturnTokens(user: User) {
    const payload: JWTPayload = {
      username: user.username,
      _id: user._id,
    };
    const tokens = await this.signPayload(payload);
    await this.userService.updateRefreshTokenForUser(
      user._id,
      tokens.refreshToken,
    );
    return tokens;
  }

  async getTokenForUser(loginWrapper: LoginWrapper) {
    const user = await this.userService.findUserByUsername(
      loginWrapper.username,
    );
    if (await bcrypt.compare(loginWrapper.password, user.password)) {
      return await this.signJWTAndReturnTokens(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.FORBIDDEN);
    }
  }

  async getTokenForRefresh(refreshAuthWrapper: RefreshAuthWrapper) {
    const decodedJwtAccessToken = decode(
      refreshAuthWrapper.refreshToken,
    )! as JwtPayload;
    const issuedAt = dayjs.unix(decodedJwtAccessToken.exp!);
    const diff = dayjs().diff(issuedAt, 'seconds');
    if (diff > 0) {
      throw new HttpException('Refresh Token Expired', HttpStatus.FORBIDDEN);
    }
    const user =
      await this.userService.findUserByRefreshToken(refreshAuthWrapper);
    if (user) {
      return await this.signJWTAndReturnTokens(user);
    } else {
      throw new HttpException(
        "Refresh Token Doesn't Match",
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async validateUser(payload: JWTPayload) {
    const a = await this.userService.findUserById(
      new mongoose.Types.ObjectId(payload._id),
    );
    return sanitizeUser(a);
  }
}
