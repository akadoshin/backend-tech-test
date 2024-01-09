import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

/** Services */
import { AuthenticateService } from '../service/authenticate.service';

/** DTO */
import { AuthenticateUserDto } from '../../dto/authenticate.dto';
import { CreateUserDto } from '../../dto/create-user.dto';

import { Public } from '@config/config/decorator/public.decorator';

@Public()
@Controller()
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  /**
   * @description Create a new user
   */
  @Post('create-user')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authenticateService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description Authenticate a user in the database
   * and return the user information and a JWT token
   */
  @Post('authenticate')
  async authenticate(@Body() authenticateUserDto: AuthenticateUserDto) {
    try {
      return this.authenticateService.authenticate(authenticateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
