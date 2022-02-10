import { Test, TestingModule } from '@nestjs/testing';
import { CoreBrandsCreateService } from './core-brands-create.service';

describe('CoreBrandsCreateService', () => {
  let service: CoreBrandsCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreBrandsCreateService],
    }).compile();

    service = module.get<CoreBrandsCreateService>(CoreBrandsCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
