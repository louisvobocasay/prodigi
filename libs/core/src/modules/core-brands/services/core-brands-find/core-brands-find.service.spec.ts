import { Test, TestingModule } from '@nestjs/testing';
import { CoreBrandsFindService } from './core-brands-find.service';

describe('CoreBrandsFindService', () => {
  let service: CoreBrandsFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreBrandsFindService],
    }).compile();

    service = module.get<CoreBrandsFindService>(CoreBrandsFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
