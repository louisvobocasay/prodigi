import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterRangeOfTimeConditions } from '../../../models';

export class VGetWishlistedProductsDto extends FilterRangeOfTimeConditions {
  @ApiPropertyOptional({ required: true })
  title: string;
}
