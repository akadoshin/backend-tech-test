import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

import { User, UserCredentials } from '../interfaces/user.interface';

export class UserCredentialsDto implements UserCredentials {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}

export class CreateUserDto extends UserCredentialsDto implements User {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly name: string;
}
