import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CoreBaseParameter } from '@online-festival/core';
import { Response } from 'express';
import {
  ParamParserDecorator,
  RequestDecorator,
  UserContextDecorator,
} from '../../decorators';
import { RequestContext, UserContext } from '../../models';
import {
  ResponseWishlistedProductsDto,
  VGetWishlistedProductsDto,
} from './dto';
import { ProductsCreateService } from './services/products-create/products-create.service';
import { ProductsFindService } from './services/products-find/products-find.service';
@Controller('products')
@ApiTags('Product Module')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  /**
   *
   */
  constructor(
    private readonly productsFindService: ProductsFindService,
    private readonly productsCreateService: ProductsCreateService,
  ) {}

  @Get()
  @ApiResponse({ type: ResponseWishlistedProductsDto, isArray: true })
  @ApiOperation({ summary: 'Get list wish listed products' })
  getWishlistedProducts(
    @RequestDecorator() requestContext: RequestContext,
    @UserContextDecorator() userContext: UserContext,
    @ParamParserDecorator()
    queries: CoreBaseParameter<VGetWishlistedProductsDto>,
    @Res() response: Response,
  ) {
    return this.productsFindService.findWishlistedProducts(
      requestContext,
      userContext,
      queries,
      response,
    );
  }

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
