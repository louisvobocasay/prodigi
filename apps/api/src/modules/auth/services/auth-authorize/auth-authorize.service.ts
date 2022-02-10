import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CoreETime,
  CoreEUsersGroups,
  CoreSharedService,
  CoreUserEntity,
  CoreUsersCreateService,
  CoreUsersFindOneService,
  CryptoUtil
} from '@online-festival/core';
import { RequestContext } from '../../../../models';
import { VAuthorizePayloadDto } from '../../dto';
import { ApiEAuthException } from '../../enum';

@Injectable()
export class AuthAuthorizeService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly coreUsersFindOneService: CoreUsersFindOneService,
    private readonly coreUsersCreateService: CoreUsersCreateService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  createSession(user: CoreUserEntity) {
    return this.jwtService.sign({ username: user.username, id: user.id, group: user.group });
  }

  async authorize(
    requestContext: RequestContext,
    payload: VAuthorizePayloadDto
  ) {
    const user: CoreUserEntity = await this.coreUsersFindOneService.findAndValidateUserByUsername(payload.username);
    const passwordHashed: string = CryptoUtil.generateSHA256(payload.password, user.passwordHashedSalt);
    this.exception.unauthorized(user.passwordHashed !== passwordHashed, ApiEAuthException.INVALID_PASSWORD);

    const accessToken = this.createSession(user);
    await this.coreUsersCreateService.createUserSession(user.username, accessToken, user.group, CoreETime.A_DAY_IN_SECOND);
    return accessToken;
  }
}
