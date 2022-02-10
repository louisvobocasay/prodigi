import { Test, TestingModule } from '@nestjs/testing';
import { CoreUsersFindOneService } from './core-users-find-one.service';

describe('CoreUsersFindOneService', () => {
  let service: CoreUsersFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUsersFindOneService],
    }).compile();

    service = module.get<CoreUsersFindOneService>(CoreUsersFindOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
