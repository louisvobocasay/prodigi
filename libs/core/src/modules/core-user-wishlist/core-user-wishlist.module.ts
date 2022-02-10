import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreUserWishlistEntity } from './entities';
import { CoreUserWishlistCreateService } from './services/core-user-wishlist-create/core-user-wishlist-create.service';
import { CoreUserWishlistFindOneService } from './services/core-user-wishlist-find-one/core-user-wishlist-find-one.service';
import { CoreUserWishlistFindService } from './services/core-user-wishlist-find/core-user-wishlist-find.service';
import { CoreUserWishlistUpdateService } from './services/core-user-wishlist-update/core-user-wishlist-update.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoreUserWishlistEntity])],
  providers: [
    CoreUserWishlistFindService,
    CoreUserWishlistFindOneService,
    CoreUserWishlistCreateService,
    CoreUserWishlistUpdateService,
  ],
  exports: [
    CoreUserWishlistFindService,
    CoreUserWishlistFindOneService,
    CoreUserWishlistCreateService,
    CoreUserWishlistUpdateService,
  ],
})
export class CoreUserWishlistModule {}
