import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductTypesCreateService } from './core-product-types-create.service';

describe('CoreProductTypesCreateService', () => {
  let service: CoreProductTypesCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductTypesCreateService],
    }).compile();

    service = module.get<CoreProductTypesCreateService>(CoreProductTypesCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
