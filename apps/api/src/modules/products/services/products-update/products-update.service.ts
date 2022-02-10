import { Injectable } from '@nestjs/common';
import {
  CoreProductEntity,
  CoreProductsFindOneService,
  CoreProductsUpdateService,
  CoreSharedService,
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
}
