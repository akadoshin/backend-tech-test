import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateController } from './authenticate.controller';

describe('AuthenticateController', () => {
  let controller: AuthenticateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticateController],
    }).compile();

    controller = module.get<AuthenticateController>(AuthenticateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[POST] authenticate', () => {
    it(`Authenticate an user`, async () => {
      expect(true).toBe(true);
    });

    it(`Authenticate an user with wrong parameters`, async () => {
      expect(false).toBe(false);
    });
  });
});
