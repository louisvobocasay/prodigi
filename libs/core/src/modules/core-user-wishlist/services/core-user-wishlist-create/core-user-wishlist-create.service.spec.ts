import { Test, TestingModule } from '@nestjs/testing';
import { CoreUserWishlistCreateService } from './core-user-wishlist-create.service';

describe('CoreUserWishlistCreateService', () => {
  let service: CoreUserWishlistCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUserWishlistCreateService],
    }).compile();

    service = module.get<CoreUserWishlistCreateService>(CoreUserWishlistCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
