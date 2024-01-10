import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/** Interfaces */
import { User, UserCredentials } from '../../interfaces/user.interface';

/** DTO */
import { AuthenticateUserDto } from '../../dto/authenticate.dto';
import { CreateUserDto } from '../../dto/create-user.dto';

/** Services */
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthenticateService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      const access_token = await this.generateToken(user);
      return { ...user, access_token };
    } catch {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  async authenticate(authUserDto: AuthenticateUserDto) {
    /**
     * @description The throw its the same for both cases
     * to avoid giving information about the user
     */
    try {
      const user = await this.userService.findOne(authUserDto.email);
      if (user) {
        const match = await this.comparePassword(authUserDto, user.password);
        if (match) {
          const access_token = await this.generateToken(user);
          return { ...user, access_token };
        }
      } else {
        throw new Error('User Not Found');
      }
    } catch {
      throw new HttpException(
        'Invalid credentials OR user not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async generateToken(user: User) {
    return await this.jwtService.signAsync({
      payload: {
        sub: user.id,
        email: user.email,
      },
    });
  }

  async comparePassword(user: UserCredentials, hash: string) {
    return await compare(user.password, hash);
  }
}
