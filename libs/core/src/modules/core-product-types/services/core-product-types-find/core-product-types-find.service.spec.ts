import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductTypesFindService } from './core-product-types-find.service';

describe('CoreProductTypesFindService', () => {
  let service: CoreProductTypesFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductTypesFindService],
    }).compile();

    service = module.get<CoreProductTypesFindService>(CoreProductTypesFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
