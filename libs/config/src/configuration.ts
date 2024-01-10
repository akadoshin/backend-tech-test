import { VERSION_NEUTRAL } from '@nestjs/common';

/** Interfaces */
import { Configuration } from './interfaces/configuration.interface';

/**
 * @description
 * Load the configuration for environment variables
 */
export default (): Configuration => ({
  version: process.env.VERSION || VERSION_NEUTRAL,
  environment: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '60s',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    ttl: parseInt(process.env.REDIS_TTL || '600', 10),
  },
  microservices: {
    user: {
      prefix: process.env.MICROSERVICE_USER_PREFIX || 'user',
      port: parseInt(process.env.MICROSERVICE_USER_PORT || '3001', 10),
      database: process.env.MICROSERVICE_USER_DB || 'database.sqlite',
    },
    task: {
      prefix: process.env.MICROSERVICE_TASK_PREFIX || 'task',
      port: parseInt(process.env.MICROSERVICE_TASK_PORT || '3002', 10),
      database: process.env.MICROSERVICE_TASK_DB || 'database.sqlite',
    },
  },
});
