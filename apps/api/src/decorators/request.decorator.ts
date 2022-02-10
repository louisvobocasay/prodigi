import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ApiEHeaders } from '../constants';

export const RequestDecorator = createParamDecorator(
  (headerKey: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const origin = request.get('origin') || request.headers.host;
    const forwardedIp =
      request.header(ApiEHeaders.FORWARDED_IP) ||
      request.connection.remoteAddress;
    const userAgent = request.headers[ApiEHeaders.USER_AGENT];
    const timezone = request.header(ApiEHeaders.TIMEZONE);
    const requestHeader = {
      language: 'en',
      ipAddress: forwardedIp,
      origin: origin,
      originWithoutProtocol: origin
        .replace('http://', '')
        .replace('https://', ''),
      userAgent,
      timezone,
    };

    if (headerKey) {
      requestHeader[headerKey] = request.get(headerKey);
    }

    return requestHeader;
  },
);
