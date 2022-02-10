import { Test, TestingModule } from '@nestjs/testing';
import { CoreUserWishlistUpdateService } from './core-user-wishlist-update.service';

describe('CoreUserWishlistUpdateService', () => {
  let service: CoreUserWishlistUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUserWishlistUpdateService],
    }).compile();

    service = module.get<CoreUserWishlistUpdateService>(CoreUserWishlistUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
