import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, ValidateIf } from 'class-validator';
import { CoreEException, Is } from '@online-festival/core';

export class VFilterPageSizeModel {
  @ApiProperty({ default: 20, required: false })
  @ValidateIf((o) => Is.notNullOrUndefined(o.size))
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: { dataType: 'positive number' },
  })
  size: number;
}
