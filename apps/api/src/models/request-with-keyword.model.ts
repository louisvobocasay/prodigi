import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CoreEException } from '@online-festival/core';

export class VRequestWithKeywordModel {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  keyword: string;
}
