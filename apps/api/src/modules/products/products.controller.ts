import {
  Controller, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth, ApiTags
} from '@nestjs/swagger';

@Controller('products')
@ApiTags('Product Module')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  /**
   *
   */
  constructor() {}
}
