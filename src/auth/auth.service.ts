import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { removeUserSensitiveData } from 'src/users/utils/functions';
import { UsersService } from 'src/users/users.service';
import { AUTH_CONSTANTS } from './config/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    let userIsValid;
    try {
      userIsValid = !!user && !!(await bcrypt.compare(pass, user.password));
    } catch (error) {
      throw new HttpException(
        'AUTH.USER_IS_NOT_VALID',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (userIsValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return removeUserSensitiveData((user as any).toObject());
    }
    return null;
  }

  async login(
    user: any,
    firstLogin?: boolean,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    isFirstLogin: boolean;
  }> {
    const payload = this.getJwtPayload(user._id);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: Number(AUTH_CONSTANTS.refreshExpirationTime) / 1000,
      }),
      isFirstLogin: !!firstLogin ? true : !!user.isFirstLogin ? true : false,
    };
  }

  getJwtPayload(userId: string) {
    if (!userId)
      throw new HttpException(
        'AUTH.NOT_ENOUGH_INFO_TO_GENERATE_PAYLOAD',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return { userId };
  }
}
