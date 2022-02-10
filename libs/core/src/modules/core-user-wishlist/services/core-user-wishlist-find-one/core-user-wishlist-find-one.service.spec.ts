import { Test, TestingModule } from '@nestjs/testing';
import { CoreUserWishlistFindOneService } from './core-user-wishlist-find-one.service';

describe('CoreUserWishlistFindOneService', () => {
  let service: CoreUserWishlistFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUserWishlistFindOneService],
    }).compile();

    service = module.get<CoreUserWishlistFindOneService>(CoreUserWishlistFindOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
