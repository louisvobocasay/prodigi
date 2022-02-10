import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogoutService } from './auth-logout.service';

describe('AuthLogoutService', () => {
  let service: AuthLogoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLogoutService],
    }).compile();

    service = module.get<AuthLogoutService>(AuthLogoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
