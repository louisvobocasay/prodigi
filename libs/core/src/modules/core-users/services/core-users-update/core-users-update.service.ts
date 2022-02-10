import { Injectable } from '@nestjs/common';
import { CoreSharedService } from '../../../../services';
import { CoreHelperRedisService } from '../../../core-helper-redis';
import { CoreEUsersGroups } from '../../enum';
import { CoreUsersCreateService } from '../core-users-create/core-users-create.service';

@Injectable()
export class CoreUsersUpdateService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private redisService: CoreHelperRedisService,
    private readonly usersCreateService: CoreUsersCreateService,
  ) {
    super();
  }

  removeUserSession(username: string, group: CoreEUsersGroups) {
    const sessionKey = this.usersCreateService.createSessionKey(
      username,
      group,
    );
    return this.redisService.del(sessionKey);
  }
}
