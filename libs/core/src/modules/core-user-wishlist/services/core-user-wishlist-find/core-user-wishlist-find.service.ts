import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CoreBaseParameter,
  CoreFilterResultInterface,
} from '../../../../models';
import { CoreSharedFindService } from '../../../../services';
import { Is } from '../../../../utils';
import { CoreProductEntity } from '../../../core-products';
import { CoreUserWishlistEntity } from '../../entities';
import { CoreUserWishlistFilterConditionsInterface } from '../../interfaces';

@Injectable()
export class CoreUserWishlistFindService extends CoreSharedFindService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreUserWishlistEntity)
    private readonly repo: Repository<CoreUserWishlistEntity>,
  ) {
    super(repo);
  }

  async findUserWishlistedProducts({
    condition,
    pagination,
    sort,
  }: CoreBaseParameter<CoreUserWishlistFilterConditionsInterface>) {
    const queryBuilder = this.repo
      .createQueryBuilder('wlp')
      .leftJoin(
        CoreProductEntity,
        'p',
        'p.id = wlp.product_id and p.is_active = true',
      )
      .where('wlp.created_by = :createdBy', { createdBy: condition.createdBy })
      .andWhere('wlp.is_active = true');

    if (Is.notNullOrUndefined(condition.title)) {
      queryBuilder.andWhere(`p.title like '%:title%'`, {
        title: condition.title,
      });
    }

    queryBuilder.select(
      super.mapFieldToCamelCase([
        'wlp.id',
        'wlp.created_at',
        'wlp.updated_at',
        'wlp.created_by',
        'wlp.updated_by',
        'wlp.product_id',
        'p.title',
        'wlp.inserted_from_ip',
        'wlp.inserted_from_device',
        'wlp.is_active',
      ]),
    );
    const totalRecords: number = await queryBuilder.getCount();
    return <CoreFilterResultInterface<CoreUserWishlistEntity>>{
      totalRecords,
      data: await super.paginateFromQueryBuilderWithoutResponse(
        queryBuilder,
        pagination,
        [sort || ['wlp.created_at', 'DESC']],
      ),
    };
  }
}
