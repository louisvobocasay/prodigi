import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ClassValidatorUtil } from '../utils';

@Injectable()
export class CoreValidationPipe implements PipeTransform<{}> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const classObject = plainToClass(metatype, value);
    const errors = await validate(classObject);

    if (errors.length) {
      const errorParsed = ClassValidatorUtil.parseError(errors);
      throw new BadRequestException({
        errors: errorParsed,
        code: 'VALIDATION_FAILED',
      });
    }

    return classObject;
  }

  private toValidate(metatype: any) {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
