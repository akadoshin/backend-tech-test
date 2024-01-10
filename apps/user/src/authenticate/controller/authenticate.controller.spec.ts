import { Test } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from '../service/authenticate.service';

import { CreateUserDto } from '../../dto/create-user.dto';
import { AuthenticateUserDto } from '../../dto/authenticate.dto';
import { User } from '../../interfaces/user.interface';

describe('AuthenticateController', () => {
  let authenticateController: AuthenticateController;
  let authenticateService: AuthenticateService;

  const mockUserResponse: Required<User> = {
    id: expect.any(String),
    email: expect.any(String),
    createdAt: expect.any(Date),
    password: expect.any(String),
    name: expect.any(String),
    access_token: expect.any(String),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthenticateController],
      providers: [
        {
          provide: AuthenticateService,
          useValue: {
            createUser: jest.fn(),
            authenticate: jest.fn(),
          },
        },
      ],
    }).compile();

    authenticateController = moduleRef.get<AuthenticateController>(
      AuthenticateController,
    );
    authenticateService =
      moduleRef.get<AuthenticateService>(AuthenticateService);
  });

  it('should be defined', () => {
    expect(authenticateController).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = new CreateUserDto();
    jest
      .spyOn(authenticateService, 'createUser')
      .mockResolvedValue(mockUserResponse);

    expect(await authenticateController.createUser(createUserDto)).toBe(
      mockUserResponse,
    );
    expect(authenticateService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should throw an error when createUser fails', async () => {
    const createUserDto = new CreateUserDto();
    jest
      .spyOn(authenticateService, 'createUser')
      .mockRejectedValue(new Error('Error'));

    await expect(
      authenticateController.createUser(createUserDto),
    ).rejects.toThrow(new HttpException('Error', HttpStatus.BAD_REQUEST));
  });

  it('should authenticate a user', async () => {
    const authenticateUserDto = new AuthenticateUserDto();
    jest
      .spyOn(authenticateService, 'authenticate')
      .mockResolvedValue(mockUserResponse);

    expect(await authenticateController.authenticate(authenticateUserDto)).toBe(
      mockUserResponse,
    );
    expect(authenticateService.authenticate).toHaveBeenCalledWith(
      authenticateUserDto,
    );
  });

  it('should throw an error when authenticate fails', async () => {
    const authenticateUserDto = new AuthenticateUserDto();
    jest
      .spyOn(authenticateService, 'authenticate')
      .mockRejectedValue(new Error('Error'));

    await expect(
      authenticateController.authenticate(authenticateUserDto),
    ).rejects.toThrow(new HttpException('Error', HttpStatus.BAD_REQUEST));
  });
});
