import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CorePaginationModel } from '../../models';
import { CoreSharedService } from '../core-shared/core-shared.service';
import { Response } from 'express';

@Injectable()
export class CoreSharedFindService<T = unknown> extends CoreSharedService {
  constructor(private readonly _repository: Repository<T>) {
    super();
  }

  public async paginateFromQueryBuilder<T, TResult = never>(
    res: Response,
    selectQueryBuilder: SelectQueryBuilder<T>,
    counter: number,
    pagination: CorePaginationModel,
    orders: Array<[string, 'DESC' | 'ASC']> = [],
    mapper?: (data: T | T[]) => void,
  ) {
    let queryBuilder = selectQueryBuilder
      .offset(pagination.page * pagination.size)
      .limit(pagination.size);

    for (const [key, sortType] of orders) {
      queryBuilder = queryBuilder.orderBy(key, sortType);
    }

    const results = await queryBuilder.execute();
    if (mapper) {
      mapper(results);
    }
    return await super.mapResponse(results, res, {
      totalRecords: counter,
      page: pagination.page,
      size: pagination.size,
    });
  }

  public async addCreatedTime(
    selectQueryBuilder: SelectQueryBuilder<T>,
    alias: string,
    fromDate: Date,
    toDate: Date,
    fieldName = 'created_at',
  ) {
    const field = `${alias}.${fieldName}`;
    selectQueryBuilder.andWhere(`${field} >= :fromDate`, { fromDate });
    if (toDate) {
      selectQueryBuilder.andWhere(`${field} <= :toDate`, { toDate });
    }

    return selectQueryBuilder;
  }

  public async paginateFromQueryBuilderWithoutResponse<T>(
    selectQueryBuilder: SelectQueryBuilder<T>,
    pagination: CorePaginationModel,
    orders: Array<[string, 'DESC' | 'ASC']> = [],
    mapper?: (data: T | T[]) => void,
  ): Promise<T[]> {
    let queryBuilder = selectQueryBuilder
      .offset(pagination.page * pagination.size)
      .limit(pagination.size);

    for (const order of orders) {
      if (order) queryBuilder = queryBuilder.orderBy(order[0], order[1]);
    }

    const results = await queryBuilder.execute();
    if (mapper) {
      mapper(results);
    }
    return results;
  }
}
