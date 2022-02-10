import { Test, TestingModule } from '@nestjs/testing';
import { CoreUsersFindService } from './core-users-find.service';

describe('CoreUsersFindService', () => {
  let service: CoreUsersFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUsersFindService],
    }).compile();

    service = module.get<CoreUsersFindService>(CoreUsersFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
