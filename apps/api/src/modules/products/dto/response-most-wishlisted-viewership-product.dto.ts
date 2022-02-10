import { ApiProperty } from '@nestjs/swagger';

export class ResponseMostWishlistedViewershipProductDto {
  @ApiProperty() id: number;
  @ApiProperty() title: string;
  @ApiProperty() wishlistedCount: number;
  @ApiProperty() viewershipNumber: number;
}
