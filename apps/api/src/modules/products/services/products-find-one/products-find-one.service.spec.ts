import { Test, TestingModule } from '@nestjs/testing';
import { ProductsFindOneService } from './products-find-one.service';

describe('ProductsFindOneService', () => {
  let service: ProductsFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsFindOneService],
    }).compile();

    service = module.get<ProductsFindOneService>(ProductsFindOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
