import { Test, TestingModule } from '@nestjs/testing';
import { CoreUsersCreateService } from './core-users-create.service';

describe('CoreUsersCreateService', () => {
  let service: CoreUsersCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUsersCreateService],
    }).compile();

    service = module.get<CoreUsersCreateService>(CoreUsersCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
