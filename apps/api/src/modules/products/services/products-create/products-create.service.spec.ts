import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCreateService } from './products-create.service';

describe('ProductsCreateService', () => {
  let service: ProductsCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsCreateService],
    }).compile();

    service = module.get<ProductsCreateService>(ProductsCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
