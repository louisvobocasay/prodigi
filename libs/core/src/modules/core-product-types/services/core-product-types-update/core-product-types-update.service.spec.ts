import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductTypesUpdateService } from './core-product-types-update.service';

describe('CoreProductTypesUpdateService', () => {
  let service: CoreProductTypesUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductTypesUpdateService],
    }).compile();

    service = module.get<CoreProductTypesUpdateService>(CoreProductTypesUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
