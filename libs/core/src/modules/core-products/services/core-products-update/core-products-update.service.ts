import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { CoreProductEntity } from '../../entities';

@Injectable()
export class CoreProductsUpdateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreProductEntity)
    private readonly repo: Repository<CoreProductEntity>,
  ) {
    super();
  }

  updateProduct(id: number, product: CoreProductEntity) {
    return this.repo.update({ id }, product);
  }
}
