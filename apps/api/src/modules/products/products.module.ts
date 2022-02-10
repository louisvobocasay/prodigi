import { Module } from '@nestjs/common';
import {
  CoreHelperStorageModule,
  CoreMediaModule,
  CoreProductsModule,
} from '@online-festival/core';
import { AdminProductsController } from './admin-products.controller';
import { ProductsController } from './products.controller';
import { PublicProductsController } from './public-products.controller';
import { ProductsCreateService } from './services/products-create/products-create.service';
import { ProductsFindOneService } from './services/products-find-one/products-find-one.service';
import { ProductsFindService } from './services/products-find/products-find.service';
import { ProductsUpdateService } from './services/products-update/products-update.service';

@Module({
  imports: [CoreHelperStorageModule, CoreProductsModule, CoreMediaModule],
  controllers: [
    ProductsController,
    AdminProductsController,
    PublicProductsController,
  ],
  providers: [
    ProductsCreateService,
    ProductsFindService,
    ProductsFindOneService,
    ProductsUpdateService,
  ],
})
export class ProductsModule {}
