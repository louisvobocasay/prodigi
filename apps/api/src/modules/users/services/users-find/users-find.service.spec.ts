import { Test, TestingModule } from '@nestjs/testing';
import { UsersFindService } from './users-find.service';

describe('UsersFindService', () => {
  let service: UsersFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersFindService],
    }).compile();

    service = module.get<UsersFindService>(UsersFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
