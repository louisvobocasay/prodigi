import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreMediaEntity } from './entities';
import { CoreMediaCreateService } from './services/core-media-create/core-media-create.service';
import { CoreMediaFindService } from './services/core-media-find/core-media-find.service';
import { CoreMediaUpdateService } from './services/core-media-update/core-media-update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoreMediaEntity])
  ],
  providers: [
    CoreMediaCreateService,
    CoreMediaFindService,
    CoreMediaUpdateService,
  ],
  exports: [
    CoreMediaCreateService,
    CoreMediaFindService,
    CoreMediaUpdateService,
  ],
})
export class CoreMediaModule { }
