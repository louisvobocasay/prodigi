import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreBrandEntity } from './entities';
import { CoreBrandsCreateService } from './services/core-brands-create/core-brands-create.service';
import { CoreBrandsFindOneService } from './services/core-brands-find-one/core-brands-find-one.service';
import { CoreBrandsFindService } from './services/core-brands-find/core-brands-find.service';
import { CoreBrandsUpdateService } from './services/core-brands-update/core-brands-update.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoreBrandEntity])],
  providers: [
    CoreBrandsCreateService,
    CoreBrandsFindService,
    CoreBrandsFindOneService,
    CoreBrandsUpdateService,
  ],
  exports: [
    CoreBrandsCreateService,
    CoreBrandsFindService,
    CoreBrandsFindOneService,
    CoreBrandsUpdateService,
  ],
})
export class CoreBrandsModule {}
