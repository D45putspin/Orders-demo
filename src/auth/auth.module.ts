import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ThirdPartyModule } from 'src/third-party/third-party.module';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS } from './config/constants';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './config/local.strategy';
import { JwtStrategy } from './config/jwt.strategy';
@Module({
  imports: [
    UsersModule,
    ThirdPartyModule,
    JwtModule.register({
      secret: AUTH_CONSTANTS.secret,
      signOptions: {
        expiresIn: Number(AUTH_CONSTANTS.tokenExpirationTime) / 1000,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
