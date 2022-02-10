import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { OnlineFestivalCoreModule } from '@online-festival/core';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MediaModule } from './modules/media/media.module';

const envFilePath: string = path.join(
  __dirname,
  '../../../apps',
  'api/src',
  'env',
  (process.env.NODE_ENV || '') + '.env',
);

@Module({
  imports: [
    OnlineFestivalCoreModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    MediaModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
