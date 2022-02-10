import { Test, TestingModule } from '@nestjs/testing';
import { CoreSharedFindService } from './core-shared-find.service';

describe('CoreSharedFindService', () => {
  let service: CoreSharedFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreSharedFindService],
    }).compile();

    service = module.get<CoreSharedFindService>(CoreSharedFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
