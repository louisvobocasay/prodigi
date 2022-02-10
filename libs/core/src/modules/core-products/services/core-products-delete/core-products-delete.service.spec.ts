import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductsDeleteService } from './core-products-delete.service';

describe('CoreProductsDeleteService', () => {
  let service: CoreProductsDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductsDeleteService],
    }).compile();

    service = module.get<CoreProductsDeleteService>(CoreProductsDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
