import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, IsNull, Repository } from 'typeorm';
import { CoreSharedFindService } from '../../../../services';
import { CoreMediaEntity } from '../../entities';

@Injectable()
export class CoreMediaFindService extends CoreSharedFindService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreMediaEntity)
    private readonly repo: Repository<CoreMediaEntity>,
  ) {
    super(repo);
  }

  findMediaByIds(ids: number[]) {
    return this.repo.find({
      where: {
        id: In(ids),
        isActive: true,
      },
    });
  }

  withTransactionFindMediaByIds(
    trx: EntityManager,
    ids: number[],
    parentId: number,
  ) {
    return trx.find(CoreMediaEntity, {
      where: { id: In(ids), isActive: true, parentId },
    });
  }

  findMediaOf(parentId: number) {
    return this.repo.find({
      where: {
        parentId: parentId,
        isActive: true,
      },
    });
  }
}
