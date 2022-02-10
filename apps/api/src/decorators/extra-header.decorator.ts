import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ApiEHeaders } from '../constants';

export function ExtraHeadersDecorator(required = true) {
  return applyDecorators(
    ApiHeader({
      name: ApiEHeaders.ACCEPT_LANGUAGE,
      required: false,
      description: 'en',
      example: 'en',
    }),
  );
}
