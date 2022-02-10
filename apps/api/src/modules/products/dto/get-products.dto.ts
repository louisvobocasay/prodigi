import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsPositive, ValidateIf } from 'class-validator';
import {
  CoreEException,
  CoreExceptionContextModel,
  Is,
} from '@online-festival/core';
import { FilterRangeOfTimeConditions } from '../../../models';

export class VGetProductsDto extends FilterRangeOfTimeConditions {
  @ApiPropertyOptional({ required: false })
  title: string;

  @ApiPropertyOptional({ required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.fromPrice))
  @IsNumber(
    {},
    {
      message: CoreEException.INVALID_VALUE,
      context: new CoreExceptionContextModel('number'),
    },
  )
  fromPrice: number;
  @ApiPropertyOptional({ required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.toPrice))
  @IsNumber(
    {},
    {
      message: CoreEException.INVALID_VALUE,
      context: new CoreExceptionContextModel('number'),
    },
  )
  toPrice: number;

  @ApiPropertyOptional({ required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.discount))
  @IsNumber(
    {},
    {
      message: CoreEException.INVALID_VALUE,
      context: new CoreExceptionContextModel('number'),
    },
  )
  discount: number;

  @ApiPropertyOptional({ required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.brandIds))
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextModel('positive number'),
    each: true,
  })
  brandIds: number[];

  @ApiPropertyOptional({ required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.typeIds))
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextModel('positive number'),
    each: true,
  })
  typeIds: number[];
}
