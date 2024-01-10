import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AuthenticateService } from './authenticate.service';
import { UserService } from '../../user/service/user.service';

import { CreateUserDto } from '../../dto/create-user.dto';
import { AuthenticateUserDto } from '../../dto/authenticate.dto';

import { UserEntity } from '../../user/entities/user.entity';
import { User } from '../../interfaces/user.interface';

describe('AuthenticateService', () => {
  let authenticateService: AuthenticateService;
  let userService: UserService;
  let jwtService: JwtService;

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
        AuthenticateService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authenticateService =
      moduleRef.get<AuthenticateService>(AuthenticateService);
    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authenticateService).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = new CreateUserDto();
    const user = new UserEntity(mockUser);
    const token = 'mockToken';
    jest.spyOn(userService, 'create').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockReturnValue(Promise.resolve(token));

    const result = await authenticateService.createUser(createUserDto);

    expect(result).toEqual({ ...user, access_token: token });
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      payload: {
        sub: user.id,
        email: user.email,
      },
    });
  });

  it('should throw an error when createUser fails', async () => {
    const createUserDto = new CreateUserDto();
    jest
      .spyOn(userService, 'create')
      .mockRejectedValue(new Error('Invalid credentials OR user not found'));

    await expect(authenticateService.createUser(createUserDto)).rejects.toThrow(
      new HttpException('Error creating user', HttpStatus.BAD_REQUEST),
    );
  });

  it('should authenticate a user', async () => {
    const authenticateUserDto = new AuthenticateUserDto();
    const user = new UserEntity(mockUser);
    const token = 'mockToken';
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockReturnValue(Promise.resolve(token));
    jest
      .spyOn(authenticateService, 'comparePassword')
      .mockImplementation(() => Promise.resolve(true));

    const result = await authenticateService.authenticate(authenticateUserDto);

    expect(result).toEqual({ ...user, access_token: token });
    expect(userService.findOne).toHaveBeenCalledWith(authenticateUserDto.email);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      payload: {
        sub: user.id,
        email: user.email,
      },
    });
  });

  it('should throw an error when authenticate fails', async () => {
    const authenticateUserDto = new AuthenticateUserDto();
    jest
      .spyOn(userService, 'findOne')
      .mockRejectedValue(new Error('Invalid credentials OR user not found'));

    await expect(
      authenticateService.authenticate(authenticateUserDto),
    ).rejects.toThrow(
      new HttpException(
        'Invalid credentials OR user not found',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });
});
