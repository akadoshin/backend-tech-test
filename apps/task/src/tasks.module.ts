import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

/** Configuration */
import { ConfigModule } from '@config/config';

/** Controllers */
import { TasksController } from './controller/tasks.controller';

/** Services */
import { TasksService } from './service/tasks.service';

/** Entities */
import { TaskEntity } from './entities/task.entity';
// import { JwtModule } from '@nestjs/jwt';

/**
 * @description
 * Microservice Task module - this module is a simple CRUD
 */
@Module({
  imports: [
    ConfigModule,
    /**
     * Configure the database connection
     * This is for his own module
     */
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: `db/${configService.get('microservices.task.database')}`,
          entities: [TaskEntity],
          synchronize: configService.get('environment') === 'development',
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([TaskEntity]),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
