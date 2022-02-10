import { Test, TestingModule } from '@nestjs/testing';
import { CoreMediaUpdateService } from './core-media-update.service';

describe('CoreMediaUpdateService', () => {
  let service: CoreMediaUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreMediaUpdateService],
    }).compile();

    service = module.get<CoreMediaUpdateService>(CoreMediaUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
