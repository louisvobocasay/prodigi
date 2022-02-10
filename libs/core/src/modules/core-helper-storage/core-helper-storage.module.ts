import { Module } from '@nestjs/common';
import { CoreHelperStorageProvider } from './providers/core-helper-storage-provider';
import { CoreHelperStorageBaseService } from './services/core-helper-storage-base/core-helper-storage-base.service';
import { CoreHelperStorageUploadService } from './services/core-helper-storage-upload/core-helper-storage-upload.service';

@Module({
  providers: [
    CoreHelperStorageProvider,
    CoreHelperStorageUploadService,
    CoreHelperStorageBaseService,
  ],
  exports: [CoreHelperStorageUploadService, CoreHelperStorageBaseService],
})
export class CoreHelperStorageModule { }
