import { Test, TestingModule } from '@nestjs/testing';
import { CoreUserWishlistFindService } from './core-user-wishlist-find.service';

describe('CoreUserWishlistFindService', () => {
  let service: CoreUserWishlistFindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUserWishlistFindService],
    }).compile();

    service = module.get<CoreUserWishlistFindService>(CoreUserWishlistFindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
