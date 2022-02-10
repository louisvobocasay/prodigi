import {
  Controller,
  Get, Res
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Response } from 'express';
import { CoreBaseParameter } from '../../../../../libs/core/src';
import { ParamParserDecorator, RequestDecorator } from '../../decorators';
import { RequestContext } from '../../models';
import { ResponseProductsDto } from './dto';
import { VGetProductsDto } from './dto/get-products.dto';
import { ProductsFindService } from './services/products-find/products-find.service';
@Controller('products/public')
@ApiTags('Product Module')
export class PublicProductsController {
  /**
   *
   */
  constructor(private readonly productsFindService: ProductsFindService) {}

  @Get()
  @ApiResponse({ type: ResponseProductsDto, isArray: true })
  @ApiOperation({ summary: 'Get list products' })
  @ApiQuery({ type: VGetProductsDto })
  getProducts(
    @RequestDecorator() requestContext: RequestContext,
    @ParamParserDecorator() queries: CoreBaseParameter<VGetProductsDto>,
    @Res() response: Response,
  ) {
    return this.productsFindService.findProducts(
      requestContext,
      queries,
      response,
    );
  }
}
