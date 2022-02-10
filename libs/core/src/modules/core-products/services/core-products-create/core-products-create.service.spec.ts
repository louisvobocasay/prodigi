import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductsCreateService } from './core-products-create.service';

describe('CoreProductsCreateService', () => {
  let service: CoreProductsCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductsCreateService],
    }).compile();

    service = module.get<CoreProductsCreateService>(CoreProductsCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
