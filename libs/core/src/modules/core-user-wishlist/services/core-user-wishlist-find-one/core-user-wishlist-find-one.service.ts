import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { Is } from '../../../../utils';
import { CoreUserWishlistEntity } from '../../entities';
import { CoreEUserWishlistException } from '../../enum';

@Injectable()
export class CoreUserWishlistFindOneService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreUserWishlistEntity)
    private readonly repo: Repository<CoreUserWishlistEntity>,
  ) {
    super();
  }

  findWishlistedProduct(createdBy: number, productId: number) {
    return this.repo.findOne({
      where: {
        productId,
        createdBy,
        isActive: true,
      },
    });
  }

  async findAndValidateWishlistedProduct(createdBy: number, productId: number) {
    const wishlistedProduct = await this.findWishlistedProduct(
      createdBy,
      productId,
    );

    this.exception.notfound(
      wishlistedProduct,
      CoreEUserWishlistException.NOT_FOUND,
    );
    return wishlistedProduct;
  }

  async findAndCheckDuplicationWishlistedProduct(
    createdBy: number,
    productId: number,
  ) {
    const wishlistedProduct = await this.findWishlistedProduct(
      createdBy,
      productId,
    );

    this.exception.conflict(
      Is.notNullOrUndefined(wishlistedProduct),
      CoreEUserWishlistException.NOT_FOUND,
    );
    return wishlistedProduct;
  }
}
