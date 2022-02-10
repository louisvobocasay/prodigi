import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreUserEntity } from './entities';
import { CoreUsersCreateService } from './services/core-users-create/core-users-create.service';
import { CoreUsersFindOneService } from './services/core-users-find-one/core-users-find-one.service';
import { CoreUsersFindService } from './services/core-users-find/core-users-find.service';
import { CoreUsersUpdateService } from './services/core-users-update/core-users-update.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoreUserEntity])],
  providers: [
    CoreUsersFindService,
    CoreUsersFindOneService,
    CoreUsersCreateService,
    CoreUsersUpdateService,
  ],
  exports: [
    CoreUsersFindService,
    CoreUsersFindOneService,
    CoreUsersCreateService,
    CoreUsersUpdateService,
  ],
})
export class CoreUsersModule {}
