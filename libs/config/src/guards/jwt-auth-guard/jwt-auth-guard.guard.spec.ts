import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import { JwtAuthGuardGuard } from './jwt-auth-guard.guard';

describe('JwtAuthGuardGuard', () => {
  let guard: JwtAuthGuardGuard;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtAuthGuardGuard,
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: ConfigService, useValue: {} },
        { provide: Reflector, useValue: { getAllAndOverride: jest.fn() } },
      ],
    }).compile();

    guard = moduleRef.get<JwtAuthGuardGuard>(JwtAuthGuardGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
