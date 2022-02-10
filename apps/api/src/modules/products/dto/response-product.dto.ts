import { ApiProperty } from '@nestjs/swagger';
import { ResponseProductImageDto } from './response-product-image.dto';

export class ResponseProductsDto {
  @ApiProperty() id: number;
  @ApiProperty() title: string;
  @ApiProperty() createdAt: string;
  @ApiProperty() updatedAt: string;
  @ApiProperty() createdBy: number;
  @ApiProperty() updatedBy: number;
  @ApiProperty() code: string;
  @ApiProperty() description: string;
  @ApiProperty() brandId: number;
  @ApiProperty() productTypeId: number;
  @ApiProperty() price: number;
  @ApiProperty() discount: number;
  @ApiProperty() viewershipNumber: number;
  @ApiProperty() quantity: number;
  @ApiProperty() isActive: boolean;
  @ApiProperty({ isArray: true , type: ResponseProductImageDto}) imageUrls: ResponseProductImageDto[];
}
