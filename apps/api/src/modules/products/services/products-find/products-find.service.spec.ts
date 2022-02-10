import { Test, TestingModule } from '@nestjs/testing';
import { ProductsFindService } from './products-find.service';

describe('ProductsFindService', () => {
  let service: ProductsFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsFindService],
    }).compile();

    service = module.get<ProductsFindService>(ProductsFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
