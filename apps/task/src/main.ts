import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

/** Types */
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  VersioningType,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';

/** Modules */
import { TasksModule } from './tasks.module';
// import { Transport } from '@nestjs/microservices';

/**
 * Bootstrap the application
 */
(async () => {
  const app = await NestFactory.create<NestExpressApplication>(TasksModule);
  const configService = app.get(ConfigService);

  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  // });

  /**
   * Enable Automatic Validation
   * @description [Best Practices]
   * Use a basic validation pipe to automatically validate all incoming requests
   * with the validation rules defined in the DTO.
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Enable Serialization
   * Use a class serializer interceptor to automatically transform all outgoing
   * responses to the DTOs defined in the controller.
   */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /**
   * Enable URI versioning
   * @description [Best Practices]
   * Versioning is a common practice to introduce breaking changes in your API without affecting existing clients.
   */
  app.enableVersioning({
    type: VersioningType.URI,
    /**
     * * In this case the version doesn't matter,
     * * but it'll be 1 for example purposes
     */
    defaultVersion: <string>configService.get('version'),
  });

  /**
   * Set the global prefix for the microservice Task
   * @example
   * http://localhost:3000/task/v1/...
   */
  app.setGlobalPrefix(<string>configService.get('microservices.task.prefix'));

  // await app.startAllMicroservices();
  await app.listen(<number>configService.get('microservices.task.port'));
})();
