import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Public } from 'src/common/guards';
import { AuthService } from './auth.service';
import { UserCreationDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import * as randtoken from 'rand-token';
import { AUTH_CONSTANTS } from './config/constants';
import { TYPE_EMAIL } from 'src/shared';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ThirdPartyEmailService } from 'src/third-party/email.service';
import { UsersService } from 'src/users/users.service';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
    private emailService: ThirdPartyEmailService,
  ) {}
  @Public()
  @Post('signup')
  async signUp(@Body() userCreationUpDto: UserCreationDto) {
    const { password } = userCreationUpDto;

    const hashedPassword = await bcrypt.hash(
      password,
      AUTH_CONSTANTS.saltRounds,
    );
    const confirmationCode = randtoken.generate(32);
    const user = await this.userService.create({
      ...userCreationUpDto,
      password: hashedPassword,
      confirmationCode,
    });

    this.emailService.sendMail<any>(user, TYPE_EMAIL.CONFIRM_MB_PAYMENT, {
      name: user.fullname,
      code: confirmationCode,
    });

    return await this.authService.login(user, true);
  }
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
