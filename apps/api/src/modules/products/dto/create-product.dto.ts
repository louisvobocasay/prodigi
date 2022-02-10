import { ApiProperty } from '@nestjs/swagger';
import {
  CoreEException,
  CoreExceptionContextModel,
  CoreExceptionContextWithLengthModel,
  Is
} from '@online-festival/core';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsPositive, ValidateIf, ValidateNested
} from 'class-validator';
import { VCreaetProductImageDto } from './create-product-image.dto';

export class VCreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  description: string;

  @ApiProperty()
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextModel('positive number'),
  })
  brand: number;

  @ApiProperty()
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextModel('positive number'),
  })
  type: number;

  @ApiProperty()
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextModel('positive number'),
  })
  price: number;

  @ApiProperty()
  @ValidateIf(o => Is.notNullOrUndefined(o.discount))
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextModel('positive number'),
  })
  discount: number;

  @ApiProperty({type: VCreaetProductImageDto, isArray: true})
  @ValidateNested()
  @Type(() => VCreaetProductImageDto)
  @ArrayMinSize(3, {
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextWithLengthModel('min', 3),
  })
  imageUrls: VCreaetProductImageDto[];
}
