import { Test, TestingModule } from '@nestjs/testing';
import { CoreUsersUpdateService } from './core-users-update.service';

describe('CoreUsersUpdateService', () => {
  let service: CoreUsersUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUsersUpdateService],
    }).compile();

    service = module.get<CoreUsersUpdateService>(CoreUsersUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
