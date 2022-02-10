import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductsFindService } from './core-products-find.service';

describe('CoreProductsFindService', () => {
  let service: CoreProductsFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductsFindService],
    }).compile();

    service = module.get<CoreProductsFindService>(CoreProductsFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
