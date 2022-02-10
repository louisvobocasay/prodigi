import { Test, TestingModule } from '@nestjs/testing';
import { CoreDatabaseConfigService } from './core-database-config.service';

describe('CoreDatabaseConfigService', () => {
  let service: CoreDatabaseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreDatabaseConfigService],
    }).compile();

    service = module.get<CoreDatabaseConfigService>(CoreDatabaseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
