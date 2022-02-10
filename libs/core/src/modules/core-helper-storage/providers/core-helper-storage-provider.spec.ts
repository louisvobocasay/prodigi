import { Test, TestingModule } from '@nestjs/testing';
import { CoreHelperStorageProvider } from './core-helper-storage-provider';

describe('CoreHelperStorageProvider', () => {
  let provider: CoreHelperStorageProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreHelperStorageProvider],
    }).compile();

    provider = module.get<CoreHelperStorageProvider>(CoreHelperStorageProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
