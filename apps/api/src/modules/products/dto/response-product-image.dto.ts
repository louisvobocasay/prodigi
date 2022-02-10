import { ApiProperty } from '@nestjs/swagger';

export class ResponseProductImageDto {
  @ApiProperty() fullPath: string;
  @ApiProperty() id: string;
  @ApiProperty() name: string;
}
