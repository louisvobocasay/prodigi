import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import {
  CoreEException,
  CoreExceptionContextModel,
} from '@online-festival/core';

export class VCreaetProductImageDto {
  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  path: string;

  @ApiProperty()
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextModel('positive number'),
  })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  name: string;
}
