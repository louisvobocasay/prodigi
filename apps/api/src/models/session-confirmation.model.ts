import { CoreEException, Is } from '@online-festival/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsHash,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class VSessionConfirmationModel {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  @MinLength(6, {
    message: CoreEException.MIN_LENGTH_REQUIRED,
    context: { min: 6 },
  })
  @MaxLength(6, {
    message: CoreEException.MAX_LENGTH_REQUIRED,
    context: { max: 6 },
  })
  token: string;

  @ApiProperty({ required: true })
  @ValidateIf((o: VSessionConfirmationModel) =>
    Is.notNullOrUndefined(o.session),
  )
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  @IsHash('md5', {
    message: CoreEException.INVALID_VALUE,
    context: { dataType: 'hash' },
  })
  session: string;
}
