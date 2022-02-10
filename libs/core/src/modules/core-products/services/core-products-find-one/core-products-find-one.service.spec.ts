import { Test, TestingModule } from '@nestjs/testing';
import { CoreProductsFindOneService } from './core-products-find-one.service';

describe('CoreProductsFindOneService', () => {
  let service: CoreProductsFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreProductsFindOneService],
    }).compile();

    service = module.get<CoreProductsFindOneService>(
      CoreProductsFindOneService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
