import { Injectable } from '@nestjs/common';
import {
  CoreHelperStorageUploadService,
  CoreMediaFindService,
  CoreMediaUpdateService,
  CoreProductsCreateService,
  CoreProductsFindOneService,
  CoreSharedService,
  CryptoUtil,
} from '@online-festival/core';
import { EntityManager, getConnection } from 'typeorm';
import { RequestContext, UserContext } from '../../../../models';
import { VCreateProductDto } from '../../dto';
import { ApiEMediaException } from '../../enum/media-exception.enum';

@Injectable()
export class ProductsCreateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly coreProductsFindOneService: CoreProductsFindOneService,
    private readonly coreProductsCreateService: CoreProductsCreateService,
    private readonly coreMediaFindService: CoreMediaFindService,
    private readonly coreMediaUpdateService: CoreMediaUpdateService,
    private readonly coreStorageUploadService: CoreHelperStorageUploadService,
  ) {
    super();
  }

  private async _validateMedia(ids: number[]) {
    const media = await this.coreMediaFindService.findMediaByIds(ids);
    this.exception.makeSure(
      ids.length === media.length,
      ApiEMediaException.MISSING_IMAGE,
    );
  }

  async createProduct(
    requestContext: RequestContext,
    userContext: UserContext,
    payload: VCreateProductDto,
  ) {
    const ids = payload.imageUrls.map((image) => image.id);
    await this._validateMedia(ids);

    await this.coreProductsFindOneService.findAndCheckDuplication(
      payload.title,
      payload.type,
      payload.brand,
    );

    const code = CryptoUtil.generateUID(10);
    return await getConnection().transaction(async (trx: EntityManager) => {
      const createdProduct =
        await this.coreProductsCreateService.withTransactionCreateProduct(trx, {
          title: payload.title.trim(),
          description: payload.description,
          price: payload.price,
          productTypeId: payload.type,
          brandId: payload.brand,
          discount: payload.discount,
          code,
          createdBy: userContext.id,
        });
      await this.coreMediaUpdateService.withTransactionUpdateMediaParentIdByIds(
        trx,
        ids,
        createdProduct.id,
      );
      createdProduct['imageUrls'] = payload.imageUrls.map((image) => {
        image['fullPath'] =
          this.coreStorageUploadService.getEndpoint() + image.path;
        return image;
      });
      return createdProduct;
    });
  }
}
