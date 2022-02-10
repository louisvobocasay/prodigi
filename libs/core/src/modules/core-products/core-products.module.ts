import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreProductEntity } from './entities/product.entity';
import { CoreProductsCreateService } from './services/core-products-create/core-products-create.service';
import { CoreProductsFindOneService } from './services/core-products-find-one/core-products-find-one.service';
import { CoreProductsFindService } from './services/core-products-find/core-products-find.service';
import { CoreProductsUpdateService } from './services/core-products-update/core-products-update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoreProductEntity])
  ],
  providers: [
    CoreProductsCreateService,
    CoreProductsFindService,
    CoreProductsFindOneService,
    CoreProductsUpdateService,
  ],
  exports: [
    CoreProductsCreateService,
    CoreProductsFindService,
    CoreProductsFindOneService,
    CoreProductsUpdateService,
  ],
})
export class CoreProductsModule { }
