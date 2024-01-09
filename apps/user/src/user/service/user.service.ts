import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/** DTO */
import { CreateUserDto } from '../../dto/create-user.dto';

/** Entities */
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}
  async create(userDto: CreateUserDto) {
    try {
      const user = new UserEntity(userDto);
      user.createdAt = new Date();

      return await this.userEntity.save(user);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * @description Get a user filtering by email
   */
  async findOne(email: CreateUserDto['email']) {
    try {
      return await this.userEntity.findOne({
        where: { email },
      });
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }
}
