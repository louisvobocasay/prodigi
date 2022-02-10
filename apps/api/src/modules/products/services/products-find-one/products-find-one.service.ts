import { Injectable } from '@nestjs/common';
import {
  CoreProductsFindOneService,
  CoreSharedService
} from '@online-festival/core';
import { RequestContext } from '../../../../models';

@Injectable()
export class ProductsFindOneService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly coreProductsFindOneService: CoreProductsFindOneService,
  ) {
    super();
  }

  async getProductViewership(requestContext: RequestContext, id: number) {
    const product =
      await this.coreProductsFindOneService.findAndValidateProductById(id);
    return product.viewershipNumber;
  }
}
