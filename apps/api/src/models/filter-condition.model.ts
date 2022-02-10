import { CoreEException, Is } from '@online-festival/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsPositive, ValidateIf } from 'class-validator';
import { VFilterPageSizeModel } from './filter-page-size.model';

export class GenericCondition {
  [x: string]: any;
}

export class FilterConditions extends VFilterPageSizeModel {
  @ApiProperty({ type: Number, default: 0, required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.page))
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: { dataType: 'positive number' },
  })
  page: number;

  @ApiPropertyOptional()
  sortBy: string;
  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  sortDirection: ['ASC' | 'DESC'];
}

export class FilterRangeOfTimeConditions extends FilterConditions {
  @ApiPropertyOptional({ type: String, required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.fromDate))
  @IsDateString(
    {},
    { message: CoreEException.REQUIRE, context: { type: 'UTC Date String' } },
  )
  fromDate: Date;

  @ApiPropertyOptional({ type: String, required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.toDate))
  @IsDateString(
    {},
    { message: CoreEException.REQUIRE, context: { type: 'UTC Date String' } },
  )
  toDate: Date;
}
