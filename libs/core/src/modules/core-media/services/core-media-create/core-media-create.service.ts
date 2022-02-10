import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { CoreMediaEntity } from '../../entities';

@Injectable()
export class CoreMediaCreateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreMediaEntity)
    private readonly repo: Repository<CoreMediaEntity>,
  ) {
    super();
  }

  createMedia(
    name: string,
    path: string,
    size: number,
    extension: string,
    parentId?: number,
  ) {
    const media = new CoreMediaEntity({
      name,
      path,
      size,
      extension,
      parentId,
    });

    return this.repo.save(media);
  }
}
