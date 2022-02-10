import { Module } from '@nestjs/common';
import { CoreHelperStorageModule, CoreMediaModule } from '@online-festival/core';
import { MediaController } from './media.controller';
import { MediaUploadService } from './services/medias-upload/medias-upload.service';

@Module({
  imports: [
    CoreHelperStorageModule,
    CoreMediaModule
  ],
  providers: [MediaUploadService],
  controllers: [MediaController]
})
export class MediaModule { }
