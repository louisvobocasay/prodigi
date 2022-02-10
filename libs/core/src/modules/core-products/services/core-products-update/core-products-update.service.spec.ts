import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductsUpdateService } from './core-products-update.service';

describe('CoreProductsUpdateService', () => {
  let service: CoreProductsUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductsUpdateService],
    }).compile();

    service = module.get<CoreProductsUpdateService>(CoreProductsUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
