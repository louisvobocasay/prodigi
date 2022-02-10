import { ApiProperty } from '@nestjs/swagger';
import { ResponseProductImageDto } from './response-product-image.dto';

export class ResponseWishlistedProductsDto {
  @ApiProperty() id: number;
  @ApiProperty() createdAt: string;
  @ApiProperty() updatedAt: string;
  @ApiProperty() createdBy: number;
  @ApiProperty() updatedBy: number;
  @ApiProperty() productId: number;
  @ApiProperty() title: string;
  @ApiProperty() insertedFromIp: string;
  @ApiProperty() insertedFromDevice: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty({ isArray: true, type: ResponseProductImageDto })
  imageUrls: ResponseProductImageDto[];
}
