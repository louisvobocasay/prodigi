import { Injectable } from '@nestjs/common';
import {
  CoreSharedService,
  CoreUsersUpdateService,
} from '@online-festival/core';
import { RequestContext, UserContext } from '../../../../models';

@Injectable()
export class AuthLogoutService extends CoreSharedService {
  /**
   *
   */
  constructor(private readonly coreUsersUpdateService: CoreUsersUpdateService) {
    super();
  }

  logout(requestContext: RequestContext, userContext: UserContext) {
    return this.coreUsersUpdateService.removeUserSession(
      userContext.username,
      userContext.group,
    );
  }
}
