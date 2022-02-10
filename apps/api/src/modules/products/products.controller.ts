import {
  Controller, HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation, ApiTags
} from '@nestjs/swagger';
import {
  RequestDecorator,
  UserContextDecorator
} from '../../decorators';
import { RequestContext, UserContext } from '../../models';
import { ProductsCreateService } from './services/products-create/products-create.service';
@Controller('products')
@ApiTags('Product Module')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  /**
   *
   */
  constructor(
    private readonly productsCreateService: ProductsCreateService,
  ) {}

  @Post(':id/wishlist')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Add product to wishlist' })
  addProductToWishlist(
    @RequestDecorator() requestContext: RequestContext,
    @UserContextDecorator() userContext: UserContext,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.productsCreateService.addProductToWishlist(
      requestContext,
      userContext,
      id,
    );
  }
}
