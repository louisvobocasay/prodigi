import { Test, TestingModule } from '@nestjs/testing';
import { CoreBrandsFindOneService } from './core-brands-find-one.service';

describe('CoreBrandsFindOneService', () => {
  let service: CoreBrandsFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreBrandsFindOneService],
    }).compile();

    service = module.get<CoreBrandsFindOneService>(CoreBrandsFindOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
