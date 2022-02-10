import { Test, TestingModule } from '@nestjs/testing';
import { CoreHelperRedisService } from './core-helper-redis.service';

describe('CoreHelperRedisService', () => {
  let service: CoreHelperRedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreHelperRedisService],
    }).compile();

    service = module.get<CoreHelperRedisService>(CoreHelperRedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
