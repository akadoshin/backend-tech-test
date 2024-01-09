import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

/** Configuration */
import configuration from './configuration';
import { JwtAuthGuardGuard } from './guards/jwt-auth-guard/jwt-auth-guard.guard';

/**
 * @description
 * This module is used to configure all the shared Modules
 * and Services between the microservices
 */
@Module({
  imports: [
    /**
     * Configure the environment variables
     */
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),

    /**
     * Configure the JWT module
     */
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: {
          expiresIn: configService.get('jwtExpirationTime'),
        },
      }),
      inject: [ConfigService],
    }),

    /**
     * Configure the cache manager
     */
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService): Promise<any> => ({
        store: redisStore,
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
        ttl: configService.get('redis.ttl'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuardGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ConfigModule {}
