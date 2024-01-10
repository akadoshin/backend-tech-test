import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from './user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../../interfaces/user.interface';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  const mockUser: User = {
    id: expect.any(String),
    email: expect.any(String),
    createdAt: expect.any(Date),
    password: expect.any(String),
    name: expect.any(String),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto = new CreateUserDto();
    const user = new UserEntity(mockUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);

    expect(await userService.create(userDto)).toBe(user);
    expect(userRepository.save).toHaveBeenCalledWith(expect.any(UserEntity));
  });

  it('should find one user', async () => {
    const email = 'test@example.com';
    const user = new UserEntity(mockUser);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    expect(await userService.findOne(email)).toBe(user);
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email } });
  });
});
