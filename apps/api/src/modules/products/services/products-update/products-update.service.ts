import { Injectable } from '@nestjs/common';
import {
  CoreProductEntity,
  CoreProductsFindOneService,
  CoreProductsUpdateService,
  CoreSharedService,
  CoreUserWishlistFindOneService,
  CoreUserWishlistUpdateService,
} from '@online-festival/core';
import { RequestContext, UserContext } from '../../../../models';
import { VCustomOperation } from '../../../../models/custom-operation.dto';
import { applyPatch } from 'fast-json-patch';
@Injectable()
export class ProductsUpdateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly coreProductsFindOneService: CoreProductsFindOneService,
    private readonly coreProductsUpdateService: CoreProductsUpdateService,
    private readonly coreUserWishlistFindOneService: CoreUserWishlistFindOneService,
    private readonly coreUserWishlistUpdateService: CoreUserWishlistUpdateService,
  ) {
    super();
  }

  async updateProduct(
    requestContext: RequestContext,
    userContext: UserContext,
    id: number,
    patch: VCustomOperation[],
  ) {
    const product =
      await this.coreProductsFindOneService.findAndValidateProductById(id);

    const updateInfo = applyPatch<Partial<CoreProductEntity>>(
      { updatedBy: userContext.id },
      patch,
    ).newDocument;

    const mergedInfo = Object.assign(product, updateInfo);
    await this.coreProductsFindOneService.findAndCheckDuplication(
      mergedInfo.title,
      mergedInfo.productTypeId,
      mergedInfo.brandId,
      mergedInfo.id,
    );
    return await this.coreProductsUpdateService.updateProduct(id, mergedInfo);
  }

  async increaseViewerShip(requestContext: RequestContext, id: number) {
    const product =
      await this.coreProductsFindOneService.findAndValidateProductById(id);
    return this.coreProductsUpdateService.updateViwershipById(product.id);
  }

  async removeProductFromWishlist(
    requestContext: RequestContext,
    userContext: UserContext,
    id: number,
  ) {
    const product =
      await this.coreProductsFindOneService.findAndValidateProductById(id);
    const wishlistedProduct =
      await this.coreUserWishlistFindOneService.findAndValidateWishlistedProduct(
        userContext.id,
        id,
      );
    return this.coreUserWishlistUpdateService.removeWishlistedProductById(
      wishlistedProduct.id,
    );
  }
}
