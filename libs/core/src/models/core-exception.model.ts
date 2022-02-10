import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { ClassValidatorUtil } from '../utils';
import { Is } from '../utils/is.util';

const DEFAULT_MODULE = 'generic';
interface ArgsInterface {
  [key: string]: string | number;
}
export class CoreExceptionModel {
  /**
   *
   */
  constructor(private _context?: string) { }

  conflict<T>(statement: T, exceptionCode: string, args?: ArgsInterface) {
    if (!statement) return;
    throw new ConflictException({
      module: this._context || DEFAULT_MODULE,
      code: exceptionCode,
      args,
    });
  }

  notfound<T>(obj: T, exceptionCode: string, args?: ArgsInterface) {
    if (Is.nullOrUndefined(obj)) {
      throw new NotFoundException({
        module: this._context || DEFAULT_MODULE,
        code: exceptionCode,
        args,
      });
    }
  }

  compare(statement: boolean, exceptionCode: string, args?: ArgsInterface) {
    if (!statement) {
      throw new BadRequestException({
        module: this._context || DEFAULT_MODULE,
        code: exceptionCode,
        args,
      });
    }
  }

  makeSure(statement: boolean, exceptionCode: string, args?: ArgsInterface) {
    if (statement) return;

    throw new BadRequestException({
      module: this._context || DEFAULT_MODULE,
      code: exceptionCode,
      args,
    });
  }

  forbidden(statement: boolean, exceptionCode: string, args?: ArgsInterface) {
    if (!statement) return;
    throw new ForbiddenException({
      module: this._context || DEFAULT_MODULE,
      code: exceptionCode,
      args,
    });
  }

  unauthorized(
    statement: boolean,
    exceptionCode: string,
    args?: ArgsInterface,
  ) {
    if (!statement) return;
    throw new UnauthorizedException({
      module: this._context || DEFAULT_MODULE,
      code: exceptionCode,
      args,
    });
  }

  serviceUnavailable(
    statement: boolean,
    exceptionCode: string,
    args?: ArgsInterface,
  ) {
    if (statement) return;
    throw new ServiceUnavailableException({
      module: this._context || DEFAULT_MODULE,
      code: exceptionCode,
      args,
    });
  }

  public async validatePayload<T>(validateObject: T) {
    const errors = await validate(validateObject as any);
    if (errors.length === 0) return;

    throw new BadRequestException({
      module: this._context,
      code: 'VALIDATION_FAILED',
      errors: ClassValidatorUtil.parseError(errors),
    });
  }
}
