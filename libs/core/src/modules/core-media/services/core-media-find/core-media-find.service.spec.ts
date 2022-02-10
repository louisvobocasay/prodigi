import { Test, TestingModule } from '@nestjs/testing';
import { CoreMediaFindService } from './core-media-find.service';

describe('CoreMediaFindService', () => {
  let service: CoreMediaFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreMediaFindService],
    }).compile();

    service = module.get<CoreMediaFindService>(CoreMediaFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
