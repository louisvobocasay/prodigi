import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreETime } from '../../../../constants';
import { CoreSharedService } from '../../../../services';
import { CoreEHelperRedisKeys, CoreHelperRedisService } from '../../../core-helper-redis';
import { CoreUserEntity } from '../../entities';
import { CoreEUsersGroups } from '../../enum';

@Injectable()
export class CoreUsersCreateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @InjectRepository(CoreUserEntity)
    private readonly repo: Repository<CoreUserEntity>,
    private redisService: CoreHelperRedisService
  ) {
    super();
  }

  createRefreshSession(username: string, group: CoreEUsersGroups) { }

  private _createSessionKey(username: string, group: CoreEUsersGroups) {
    return CoreEHelperRedisKeys.USER_SESSION + '::' + group + '::' + username;
  }

  async createUserSession(username: string, accessToken: string, group: CoreEUsersGroups, expiryIn: number = CoreETime.A_DAY_IN_SECOND) {
    const sessionKey = this._createSessionKey(username, group);
    await this.redisService.set(sessionKey, accessToken, { ttl: expiryIn });
  }

  async getUserSession(username: string, group: CoreEUsersGroups) {
    const sessionKey = this._createSessionKey(username, group);
    return this.redisService.get<string | null>(sessionKey);
  }
}
