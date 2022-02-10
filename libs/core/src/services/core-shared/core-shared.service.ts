import { Logger } from '@nestjs/common';
import { Response } from 'express';
import * as _ from 'lodash';
import { EntityManager, getConnection } from 'typeorm';
import {
  CoreEResponseHeaders,
  CoreModuleServiceConstant
} from '../../constants';
import {
  CoreExceptionModel,
  CoreReturnPaginationInterface
} from '../../models';
import { Is } from '../../utils';

export class CoreSharedService {
  protected logger: Logger;
  protected exception: CoreExceptionModel;
  constructor() {
    this.logger = new Logger(this.constructor.name, { timestamp: true });
    this.exception = new CoreExceptionModel(
      CoreModuleServiceConstant[this.constructor.name] || this.constructor.name,
    );
  }

  protected logError(error: Error, logger: Logger) {
    logger.error(error.message);
    logger.error(error.stack);
  }

  protected async transaction<T>(
    onFilled: (manager: EntityManager) => Promise<T>,
    onError?: (err) => Promise<void>,
    onSuccess?: () => Promise<void>,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await onFilled(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      if (onError) await onError(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      if (onSuccess) {
        await onSuccess();
      }
    }
  }

  protected mapFieldToCamelCase(fields: string | string[]) {
    if (Array.isArray(fields)) {
      return fields.map((field: string) => {
        return this.mapFieldToCamelCase(field);
      });
    } else if(Is.notNullOrUndefined(fields)) {
      const indexOfDot: number = fields.indexOf('.');
      const indexOfAs: number = fields.indexOf(' as ');
      if (indexOfAs > -1) {
        return fields;
      } else if (indexOfDot > -1) {
        const field = fields.substring(indexOfDot);
        const camelCase = _.camelCase(field);
        return fields + ` as "${camelCase}"`;
      } else {
        const camelCase = _.camelCase(fields);
        return fields + ` as ${camelCase}`;
      }
    }
  }

  protected async mapResponse<T>(
    data: T,
    res: Response,
    opt?: CoreReturnPaginationInterface,
  ) {
    const totalPages: number = Math.ceil(opt.totalRecords / opt.size);
    res.header(CoreEResponseHeaders.PAGE_INDEX, (opt.page + 1).toString());
    res.header(CoreEResponseHeaders.PAGE_SIZE, opt.size.toString());
    res.header(CoreEResponseHeaders.TOTAL, opt.totalRecords.toString());
    res.header(CoreEResponseHeaders.TOTAL_PAGES, totalPages.toString());
    res.setHeader(
      CoreEResponseHeaders.EXPOSE_HEADER,
      [
        CoreEResponseHeaders.PAGE_INDEX,
        CoreEResponseHeaders.PAGE_SIZE,
        CoreEResponseHeaders.TOTAL,
        CoreEResponseHeaders.TOTAL_PAGES,
      ].join(','),
    );

    res.json(data);
  }
}
