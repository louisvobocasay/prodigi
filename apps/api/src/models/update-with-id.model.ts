import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { CoreEException } from '@online-festival/core';

export class VUpdateWithIdModel {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  @IsPositive({
    message: CoreEException.INVALID_VALUE,
    context: { dataType: 'positive number' },
  })
  id: number;
}
