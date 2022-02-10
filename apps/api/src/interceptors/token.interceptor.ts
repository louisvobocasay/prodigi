import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiEHeaders } from '../constants';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  _logger: Logger;
  /**
   *
   */
  constructor(
  ) {
    this._logger = new Logger();
  }
  async intercept(context: ExecutionContext, next: CallHandler) {
    const res: Response = context.switchToHttp().getResponse();
    const req: Request = context.switchToHttp().getRequest();
    const token = req.header(ApiEHeaders.AUTHORIZATION);

    if (req.user && token) {
      // const { accessType, username } = req.user as UserContext;
      // const token: string = await this.authRedisService.getRefreshSession(
      //   accessType === 'higher',
      //   username,
      // );
      // if (token) {
      //   const cachedToken = JSON.parse(token);
      //   this._logger.log('cachedToken', cachedToken);
      //   res.header(
      //     ApiEResponseNewTokenHeaders.NEW_ACCRESS_TOKEN,
      //     cachedToken.accessToken,
      //   );
      //   res.header(
      //     ApiEResponseNewTokenHeaders.NEW_REFRESH_TOKEN,
      //     cachedToken.refreshToken,
      //   );
      //   res.header(
      //     ApiEResponseNewTokenHeaders.NEW_IAT,
      //     cachedToken.iat.toString(),
      //   );
      //   res.header(
      //     ApiEResponseNewTokenHeaders.NEW_EXP,
      //     cachedToken.exp.toString(),
      //   );
      //   await this.authRedisService.deleteRefreshSession(
      //     accessType === 'higher',
      //     username,
      //   );
      // } else {
      //   res.removeHeader(ApiEResponseNewTokenHeaders.NEW_ACCRESS_TOKEN);
      //   res.removeHeader(ApiEResponseNewTokenHeaders.NEW_REFRESH_TOKEN);
      //   res.removeHeader(ApiEResponseNewTokenHeaders.NEW_IAT);
      //   res.removeHeader(ApiEResponseNewTokenHeaders.NEW_EXP);
      // }
    }

    return next.handle();
  }
}
