import { Module } from '@nestjs/common';
import { CoreUsersModule } from '@online-festival/core';
import { AuthAuthorizeService } from './services/auth-authorize/auth-authorize.service';
import { AuthLogoutService } from './services/auth-logout/auth-logout.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiConfigKeysInterface } from '../../models';
import { JwtStrategy } from './auth.strategy';
import { AuthStrategyService } from './services/auth-strategy/auth-strategy.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ApiConfigKeysInterface>) => {
        const options: JwtModuleOptions = {
          secret: configService.get('AUTH_SECRECT_TOKEN'),
          signOptions: {
            expiresIn: configService.get('AUTH_EXPIRES_IN'),
          },
        };
        return options;
      },
    }),
    CoreUsersModule,
  ],
  providers: [
    JwtStrategy,
    AuthAuthorizeService,
    AuthLogoutService,
    AuthStrategyService,
  ],
  controllers: [AuthController]
})
export class AuthModule { }
