import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CoreBaseParameter,
  CoreFilterResultInterface,
} from '../../../../models';
import { CoreSharedFindService } from '../../../../services';
import { Is } from '../../../../utils';
import { CoreProductEntity } from '../../entities';
import { CoreProductsFilterConditionsInterface } from '../../interfaces';

@Injectable()
export class CoreProductsFindService extends CoreSharedFindService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreProductEntity)
    private readonly repo: Repository<CoreProductEntity>,
  ) {
    super(repo);
  }

  async findProducts({
    condition,
    pagination,
    sort,
  }: CoreBaseParameter<CoreProductsFilterConditionsInterface>) {
    const queryBuilder = this.repo.createQueryBuilder('p').where('1=1');

    if (Is.notNullOrUndefined(condition.title)) {
      queryBuilder.andWhere(`p.title like '%:title%'`, {
        title: condition.title,
      });
    }

    if (Is.notNullOrUndefined(condition.fromPrice)) {
      queryBuilder.andWhere(`p.price >= :fromPrice`, {
        fromPrice: +condition.fromPrice,
      });
    }

    if (Is.notNullOrUndefined(condition.toPrice)) {
      queryBuilder.andWhere(`p.price <= :toPrice`, {
        toPrice: +condition.toPrice,
      });
    }

    if (Is.notNullOrUndefined(condition.type)) {
      if (Array.isArray(condition.type)) {
        queryBuilder.andWhere('p.product_type_id in (:...types)', {
          types: condition.type,
        });
      } else {
        queryBuilder.andWhere('p.product_type_id = :type', {
          productTypeId: condition.type,
        });
      }
    }

    if (Is.notNullOrUndefined(condition.brand)) {
      if (Array.isArray(condition.brand)) {
        queryBuilder.andWhere('p.brand_id in (:...brandIds)', {
          brandIds: condition.brand,
        });
      } else {
        queryBuilder.andWhere('p.brand_id = :brandId', {
          brandId: condition.brand,
        });
      }
    }

    if (Is.notNullOrUndefined(condition.discount)) {
      queryBuilder.andWhere(`(p.discount >= :discount)`, {
        discount: +condition.discount,
      });
    }

    if (Is.notNullOrUndefined(condition.fromDate)) {
      queryBuilder.andWhere(`(p.created_at >= :fromDate)`, {
        fromDate: new Date(condition.fromDate),
      });
    }

    if (Is.notNullOrUndefined(condition.toDate)) {
      queryBuilder.andWhere(`(p.created_at <= :toDate)`, {
        toDate: new Date(condition.toDate),
      });
    }

    const totalRecords: number = await queryBuilder.getCount();

    queryBuilder.select(
      super.mapFieldToCamelCase([
        'p.id',
        'p.created_at',
        'p.updated_at',
        'p.created_by',
        'p.updated_by',
        'p.title',
        'p.code',
        'p.description',
        'p.brand_id',
        'p.product_type_id',
        'p.price',
        'p.discount',
        'p.viewership_number',
        'p.quantity',
        'p.is_active',
      ]),
    );
    return <CoreFilterResultInterface<CoreProductEntity>>{
      totalRecords,
      data: await super.paginateFromQueryBuilderWithoutResponse(
        queryBuilder,
        pagination,
        [sort || ['p.title', 'ASC']],
      ),
    };
  }

  findMostWishlistedAndViewerProducts() {
    const query: string = `
    with cte(product_id, wishlisted_count, viewership_number)
    as (
        select id, 0 as wishlisted_count,viewership_number
        from public.products
        UNION all
        select product_id, count(created_by) as wishlisted_count, 0 as viewership_number
        from public.user_wishlist
        group by product_id
    )

    select product_id as "id",p.title as "title", coalesce(sum(wishlisted_count), 0) as "wishlistedCount", coalesce(sum(cte.viewership_number),0) as "viewershipNumber"
    from cte
    join public.products p on p.id = cte.product_id
    group by product_id,p.title
    order by 1, 2
    `;
    return this.repo.query(query);
  }
}
