import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedFindService } from '../../../../services';
import { CoreProductEntity } from '../../entities';

@Injectable()
export class CoreProductsFindService extends CoreSharedFindService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreProductEntity)
    private readonly repo: Repository<CoreProductEntity>,
  ) {
    super(repo);
  }

}
