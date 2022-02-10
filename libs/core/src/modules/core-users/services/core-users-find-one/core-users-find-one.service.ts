import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreSharedService } from '../../../../services';
import { CoreUserEntity } from '../../entities';
import { CoreEUsersException } from '../../enum';

@Injectable()
export class CoreUsersFindOneService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreUserEntity)
    private readonly repo: Repository<CoreUserEntity>
  ) {
    super();
  }

  findUserByUsername(username: string) {
    return this.repo.findOne({ username });
  }

  async findAndValidateUserByUsername(username: string) {
    const user = await this.findUserByUsername(username);
    this.exception.notfound(user, CoreEUsersException.NOT_FOUND, { username });
    return user;
  }

}
