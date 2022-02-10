import {
  Controller
} from '@nestjs/common';
import {
  ApiTags
} from '@nestjs/swagger';

@Controller('products/public')
@ApiTags('Product Module')
export class PublicProductsController {
  /**
   *
   */
  constructor() {}
}
