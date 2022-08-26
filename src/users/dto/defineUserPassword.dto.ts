import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class DefineUserPasswordDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  code: string;

  @IsString()
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  password: string;
}
