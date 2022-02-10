import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { CoreUserWishlistEntity } from '../../entities';

@Injectable()
export class CoreUserWishlistCreateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreUserWishlistEntity)
    private readonly repo: Repository<CoreUserWishlistEntity>,
  ) {
    super();
  }

  createUserWishlist(
    createdBy: number,
    productId: number,
    ip: string,
    userAgent: string,
  ) {
    const wishlistedProduct = new CoreUserWishlistEntity({
      createdBy,
      productId,
      insertedFromDevice: userAgent,
      insertedFromIp: ip,
    });
    return this.repo.save(wishlistedProduct);
  }
}
