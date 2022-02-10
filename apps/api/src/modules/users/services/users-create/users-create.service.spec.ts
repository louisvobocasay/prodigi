import { Test, TestingModule } from '@nestjs/testing';
import { UsersCreateService } from './users-create.service';

describe('UsersCreateService', () => {
  let service: UsersCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCreateService],
    }).compile();

    service = module.get<UsersCreateService>(UsersCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
