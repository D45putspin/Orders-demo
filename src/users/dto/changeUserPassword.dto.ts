import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { AUTH_CONSTANTS } from 'src/auth/config/constants';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  @Matches(new RegExp(AUTH_CONSTANTS.passwordRegex), {
    message: 'AUTH.WEAK_PASSWORD',
  })
  newPassword: string;
}
