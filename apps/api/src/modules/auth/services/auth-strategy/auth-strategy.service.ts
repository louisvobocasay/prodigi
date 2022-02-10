import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CoreSharedService, CoreUsersCreateService } from '@online-festival/core';
import { Request } from 'express';
import { ApiConfigKeysInterface, UserContext } from '../../../../models';
import { ApiEAuthException } from '../../enum';
import { DecodedAccessTokenInterface } from '../../interfaces';
import { AuthAuthorizeService } from '../auth-authorize/auth-authorize.service';
import * as moment from 'moment';
@Injectable()
export class AuthStrategyService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly configService: ConfigService<ApiConfigKeysInterface>,
    private readonly jwtService: JwtService,
    private readonly coreUsersCreateService: CoreUsersCreateService,
    private readonly authAuthorizeService: AuthAuthorizeService
  ) {
    super();
  }


  private async _refreshToken(token: string, userContext: UserContext) {

    const { username, id, group, iat, exp } = this.jwtService.decode(token) as DecodedAccessTokenInterface;
    this.logger.debug([username, id, group, iat, exp])
    const future = moment(1643523146 * 1000).add(5 * 1000 * 60).toDate().getTime();
    if (future <= Date.now()) {
      
    }

  }

  async validateToken(request: Request, userContext: UserContext) {

    const currentSession = 'Bearer ' + await this.coreUsersCreateService.getUserSession(userContext.username, userContext.group);
    const authorization = request.get('Authorization');
    this.exception.unauthorized(!(currentSession && currentSession.startsWith('Bearer ')), ApiEAuthException.INVALID_REQUEST)
    this.exception.unauthorized(currentSession !== authorization, ApiEAuthException.SESSION_EXPIRED);

    // Refresh token
    await this._refreshToken(authorization.replace('Bearer ', ''), userContext);
    return true;
  }
}
