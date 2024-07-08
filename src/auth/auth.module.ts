import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule, UserModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_KEY}`,
      signOptions: { expiresIn: '1h' }

      // imports: [ConfigModule],
      // useFactory: (configService: ConfigService) => {
      //   return {
      //     secret: configService.get<string>('SECRET_KEY'),
      //     signOptions: { expiresIn: '1h' }
      //   };
      // },
      // inject: [ConfigService]

    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],

})
export class AuthModule { }
