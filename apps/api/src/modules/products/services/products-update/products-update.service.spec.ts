import { Test, TestingModule } from '@nestjs/testing';
import { ProductsUpdateService } from './products-update.service';

describe('ProductsUpdateService', () => {
  let service: ProductsUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsUpdateService],
    }).compile();

    service = module.get<ProductsUpdateService>(ProductsUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
