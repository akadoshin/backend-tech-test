import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';

/** Configuration */
import { ConfigModule } from '@config/config';

/** Entities */
import { UserEntity } from './user/entities/user.entity';

/** Modules */
import { AuthenticateModule } from './authenticate/authenticate.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    /**
     * Configure the database connection
     * This is for own module
     */
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: `db/${configService.get('microservices.user.database')}`,
        entities: [UserEntity],
        synchronize: configService.get('environment') === 'development',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthenticateModule,
  ],
})
export class AppModule {}
