import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreProductTypeEntity } from './entities';
import { CoreProductTypesCreateService } from './services/core-product-types-create/core-product-types-create.service';
import { CoreProductTypesFindService } from './services/core-product-types-find/core-product-types-find.service';
import { CoreProductTypesUpdateService } from './services/core-product-types-update/core-product-types-update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoreProductTypeEntity])
  ],
  providers: [
    CoreProductTypesCreateService,
    CoreProductTypesFindService,
    CoreProductTypesUpdateService,
  ],
  exports: [
    CoreProductTypesCreateService,
    CoreProductTypesFindService,
    CoreProductTypesUpdateService,
  ],
})
export class CoreProductTypesModule { }
