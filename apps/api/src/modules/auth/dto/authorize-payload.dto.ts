import { ApiProperty } from "@nestjs/swagger";
import { CoreEException, CoreExceptionContextWithLengthModel } from "@online-festival/core";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class VAuthorizePayloadDto {
  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  @MaxLength(32, { context: new CoreExceptionContextWithLengthModel('max', 32) })
  @MinLength(6, { context: new CoreExceptionContextWithLengthModel('min', 6) })
  password: string;
}