import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsISO8601,
  Matches,
} from 'class-validator';
import { AUTH_CONSTANTS } from 'src/auth/config/constants';

export class UserCreationDto {
  @IsString()
  fullname: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  email: string;

  @IsISO8601()
  dob: Date;

  @IsString()
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  @Matches(new RegExp(AUTH_CONSTANTS.passwordRegex), {
    message: 'AUTH.WEAK_PASSWORD',
  })
  password: string;
  addressInfo: {
    address: string;
    postalCode: string;
  };
}
