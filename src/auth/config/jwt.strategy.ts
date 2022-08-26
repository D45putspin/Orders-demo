import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AUTH_CONSTANTS } from './constants';
import { UsersService } from 'src/users/users.service';
import { removeUserSensitiveData } from 'src/users/utils/functions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_CONSTANTS.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getById(payload.userId);
    return removeUserSensitiveData(user);
  }
}
