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

  updateViwershipById(id: number) {
    return this.repo
      .createQueryBuilder('p')
      .update()
      .set({
        viewershipNumber: () => `viewership_number + 1`,
      })
      .where('id = :id', { id })
      .execute();
  }
}
