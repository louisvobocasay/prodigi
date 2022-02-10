import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { CoreUserWishlistEntity } from '../../entities';

@Injectable()
export class CoreUserWishlistUpdateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreUserWishlistEntity)
    private readonly repo: Repository<CoreUserWishlistEntity>,
  ) {
    super();
  }

  removeWishlistedProductById(id: number) {
    return this.repo.update({ id }, { isActive: false });
  }
}
