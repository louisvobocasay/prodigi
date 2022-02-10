import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationModel, BaseParameter } from '../models';

export const ParamParserDecorator = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    let sort: [string, 'ASC' | 'DESC'];

    if (req.query.sortBy) {
      sort = [
        req.query.sortBy,
        (req.query.sortDirection || 'DESC').toUpperCase(),
      ];
    }

    const condition = {};
    for (const key in req.query) {
      if (key !== 'page' && key !== 'sort' && key !== 'size') {
        try {
          condition[key] = JSON.parse(req.query[key] as string);
        } catch (error) {
          condition[key] = req.query[key];
        }
      }
    }

    const param: BaseParameter<any> = {
      pagination: new PaginationModel(req.query.page, req.query.size),
      condition: condition,
      sort,
    };

    return param;
  },
);
