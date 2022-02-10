import { Test, TestingModule } from '@nestjs/testing';
import { CoreHelperStorageBaseService } from './core-helper-storage-base.service';

describe('CoreHelperStorageBaseService', () => {
  let service: CoreHelperStorageBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreHelperStorageBaseService],
    }).compile();

    service = module.get<CoreHelperStorageBaseService>(
      CoreHelperStorageBaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
