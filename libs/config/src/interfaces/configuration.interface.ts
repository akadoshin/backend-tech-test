import { VersionValue } from '@nestjs/common/interfaces';

enum MicroserviceEnum {
  USER = 'user',
  TASK = 'task',
}

interface Microservice {
  prefix: string;
  port: number;
  database: string;
}

interface Redis {
  host: string;
  port: number;
  ttl: number;
}

export interface Configuration {
  readonly version: VersionValue;
  readonly environment: string;
  readonly jwtSecret: string;
  readonly jwtExpirationTime: string;
  readonly redis: Redis;
  readonly microservices: {
    [key in MicroserviceEnum]: Microservice;
  };
}
