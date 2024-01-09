import { UserCredentials } from '../interfaces/user.interface';
import { UserCredentialsDto } from './create-user.dto';

export class AuthenticateUserDto
  extends UserCredentialsDto
  implements UserCredentials {}
