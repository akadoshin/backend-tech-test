import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';

/** Services */
import { AuthenticateService } from './service/authenticate.service';

/** Controllers */
import { AuthenticateController } from './controller/authenticate.controller';

/** Modules */
import { UserModule } from '../user/user.module';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    // JwtModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get('jwtSecret'),
    //     signOptions: {
    //       expiresIn: configService.get('jwtExpirationTime'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService],
})
export class AuthenticateModule {}
