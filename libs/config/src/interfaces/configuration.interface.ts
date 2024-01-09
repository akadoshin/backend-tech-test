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

export interface Configuration {
  version: VersionValue;
  environment: string;
  jwtSecret: string;
  jwtExpirationTime: string;
  microservices: {
    [key in MicroserviceEnum]: Microservice;
  };
}
