import { Injectable } from '@nestjs/common';
import {
  CoreBaseParameter,
  CoreHelperStorageUploadService,
  CoreMediaEntity,
  CoreMediaFindService,
  CoreProductsFindService,
  CoreSharedService
} from '@online-festival/core';
import { Response } from 'express';
import { RequestContext } from '../../../../models';
import { VGetProductsDto } from '../../dto/get-products.dto';
@Injectable()
export class ProductsFindService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly coreProductsFindService: CoreProductsFindService,
    private readonly coreMediaFindService: CoreMediaFindService,
    private readonly coreStorageUploadService: CoreHelperStorageUploadService,
  ) {
    super();
  }

  private async _populateImages(productId: number) {
    const images = (await this.coreMediaFindService.findMediaOf(productId)).map(
      (image: CoreMediaEntity) => {
        return {
          fullPath: this.coreStorageUploadService.getEndpoint() + image.path,
          id: image.id,
          path: image.path,
          name: image.name,
        };
      },
    );

    return images;
  }
  
  async findProducts(
    requestContext: RequestContext,
    queries: CoreBaseParameter<VGetProductsDto>,
    response: Response,
  ) {
    const { data, totalRecords } =
      await this.coreProductsFindService.findProducts({
        condition: {
          title: queries.condition.title,
          fromPrice: queries.condition.fromPrice,
          toPrice: queries.condition.toPrice,
          discount: queries.condition.discount,
          brand: queries.condition.brandIds,
          type: queries.condition.typeIds,
          fromDate: queries.condition.fromDate,
          toDate: queries.condition.toDate,
        },
        pagination: queries.pagination,
        sort: queries.sort,
      });

    for (const product of data) {
      product['imageUrls'] = await this._populateImages(product.id);
    }

    return super.mapResponse(data, response, {
      ...queries.pagination,
      totalRecords: totalRecords,
    });
  }
}
