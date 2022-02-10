import { Test, TestingModule } from '@nestjs/testing';
import { AuthAuthorizeService } from './auth-authorize.service';

describe('AuthAuthorizeService', () => {
  let service: AuthAuthorizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthAuthorizeService],
    }).compile();

    service = module.get<AuthAuthorizeService>(AuthAuthorizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
