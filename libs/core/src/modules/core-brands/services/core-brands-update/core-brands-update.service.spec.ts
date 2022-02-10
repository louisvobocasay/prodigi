import { Test, TestingModule } from '@nestjs/testing';
import { CoreBrandsUpdateService } from './core-brands-update.service';

describe('CoreBrandsUpdateService', () => {
  let service: CoreBrandsUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreBrandsUpdateService],
    }).compile();

    service = module.get<CoreBrandsUpdateService>(CoreBrandsUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
