import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { CoreMediaEntity } from '../../entities';

@Injectable()
export class CoreMediaUpdateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreMediaEntity)
    private readonly repo: Repository<CoreMediaEntity>,
  ) {
    super();
  }

  withTransactionUpdateMediaParentIdByIds(
    trx: EntityManager,
    ids: number[],
    parentId: number,
  ) {
    return trx.update(CoreMediaEntity, { id: In(ids) }, { parentId });
  }
}
