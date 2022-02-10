import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestDecorator, UserContextDecorator } from '../../decorators';
import { RequestContext, UserContext } from '../../models';
import { VCustomOperation } from '../../models/custom-operation.dto';
import {
  ResponseMostWishlistedViewershipProductDto,
  VCreateProductDto,
} from './dto';
import { ProductsCreateService } from './services/products-create/products-create.service';
import { ProductsFindService } from './services/products-find/products-find.service';
import { ProductsUpdateService } from './services/products-update/products-update.service';

@Controller('admin/products')
@ApiTags('Product Module')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class AdminProductsController {
  /**
   *
   */
  constructor(
    private readonly productFindService: ProductsFindService,
    private readonly productCreateService: ProductsCreateService,
    private readonly productUpdateService: ProductsUpdateService,
  ) {}

  @Get()
  @ApiResponse({
    type: ResponseMostWishlistedViewershipProductDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Api get most wish listed product and most viewed product',
  })
  analyzeProducts(
    @RequestDecorator() requestContext: RequestContext,
    @UserContextDecorator() userContext: UserContext,
  ) {
    return this.productFindService.getMostWishlistedAndViewerProducts(
      requestContext,
      userContext,
    );
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Create new product api' })
  createProduct(
    @RequestDecorator() requestContext: RequestContext,
    @UserContextDecorator() userContext: UserContext,
    @Body() payload: VCreateProductDto,
  ) {
    return this.productCreateService.createProduct(
      requestContext,
      userContext,
      payload,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: VCustomOperation, isArray: true })
  @ApiOperation({ summary: 'Update product information partially' })
  updateProduct(
    @RequestDecorator() requestContext: RequestContext,
    @UserContextDecorator() userContext: UserContext,
    @Body() patch: VCustomOperation[],
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.productUpdateService.updateProduct(
      requestContext,
      userContext,
      id,
      patch,
    );
  }
}
