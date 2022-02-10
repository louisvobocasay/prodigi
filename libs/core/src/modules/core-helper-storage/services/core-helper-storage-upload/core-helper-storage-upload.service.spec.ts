import { Test, TestingModule } from '@nestjs/testing';
import { CoreHelperStorageUploadService } from './core-helper-storage-upload.service';

describe('CoreHelperStorageUploadService', () => {
  let service: CoreHelperStorageUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreHelperStorageUploadService],
    }).compile();

    service = module.get<CoreHelperStorageUploadService>(
      CoreHelperStorageUploadService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
