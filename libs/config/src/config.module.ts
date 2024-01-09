import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';

/** Configuration */
import configuration from './configuration';

// import { JwtAuthGuardGuard } from './guards/jwt-auth-guard/jwt-auth-guard.guard';

@Module({
  /**
   * Load the configuration for environment variables
   * from the config/configuration.ts file
   */
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
  ],
})
export class ConfigModule {}
