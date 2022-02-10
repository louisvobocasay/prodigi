import { Module } from '@nestjs/common';
import { CoreUsersModule } from '@online-festival/core';
import { UsersController } from './users.controller';

@Module({
  imports: [
    CoreUsersModule,
  ],
  controllers: [UsersController]
})
export class UsersModule { }
