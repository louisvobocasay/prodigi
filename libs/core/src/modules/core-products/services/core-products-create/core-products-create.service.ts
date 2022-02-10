import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { CoreProductEntity } from '../../entities';

@Injectable()
export class CoreProductsCreateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreProductEntity)
    private readonly repo: Repository<CoreProductEntity>,
  ) {
    super();
  }

  withTransactionCreateProduct(
    trx: EntityManager,
    product: Partial<CoreProductEntity>,
  ) {
    return trx.save(CoreProductEntity, product);
  }
}
