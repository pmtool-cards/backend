import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
