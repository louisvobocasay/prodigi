import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { Is } from '../../../../utils';
import { CoreProductEntity } from '../../entities';
import { CoreEProductsException } from '../../enum';

@Injectable()
export class CoreProductsFindOneService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreProductEntity)
    private readonly repo: Repository<CoreProductEntity>,
  ) {
    super();
  }

  findProduct(title: string, type: number, brand: number) {
    return this.repo.findOne({
      where: {
        isActive: true,
        title,
        productTypeId: type,
        brandId: brand,
      },
    });
  }

  findProductById(id: number) {
    return this.repo.findOne({
      where: {
        isActive: true,
        id,
      },
    });
  }

  async findAndValidateProductById(id: number) {
    const product = await this.findProductById(id);
    this.exception.notfound(product, CoreEProductsException.NOT_FOUND, { id });
    return product;
  }

  async findAndValidateProduct(title: string, type: number, brand: number) {
    const product = await this.findProduct(title, type, brand);
    this.exception.notfound(product, CoreEProductsException.NOT_FOUND, {
      title,
      type,
      brand,
    });

    return product;
  }

  async findAndCheckDuplication(
    name: string,
    type: number,
    brand: number,
    id?: number,
  ) {
    const product = await this.findProduct(name, type, brand);
    if (Is.notNullOrUndefined(id)) {
      this.exception.conflict(
        Is.notNullOrUndefined(product) && product.id !== id,
        CoreEProductsException.CONFLICTED,
      );
    } else {
      this.exception.conflict(
        Is.notNullOrUndefined(product),
        CoreEProductsException.CONFLICTED,
      );
    }
  }
}
