export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export interface User extends UserCredentials {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly access_token?: string;
}
