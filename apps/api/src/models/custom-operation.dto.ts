import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CoreEException } from '@online-festival/core';

export class VCustomOperation {
  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  @IsEnum(['add', 'replace'])
  op: 'add' | 'replace';

  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  value: string | number;

  @ApiProperty()
  @IsNotEmpty({ message: CoreEException.REQUIRE })
  path: string;

  /**
   *
   */
  constructor(partial: VCustomOperation) {
    Object.assign(this, partial);
  }
}
