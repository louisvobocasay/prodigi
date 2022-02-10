import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContext } from '../models';

export const UserContextDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserContext => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
