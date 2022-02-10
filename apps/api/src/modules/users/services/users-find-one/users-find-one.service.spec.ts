import { Test, TestingModule } from '@nestjs/testing';
import { UsersFindOneService } from './users-find-one.service';

describe('UsersFindOneService', () => {
  let service: UsersFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersFindOneService],
    }).compile();

    service = module.get<UsersFindOneService>(UsersFindOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
