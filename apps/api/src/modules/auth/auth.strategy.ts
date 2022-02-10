import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CoreExceptionModel } from '@online-festival/core';
import { Request } from 'express';
import * as _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserContext } from '../../models';
import { AuthStrategyService } from './services/auth-strategy/auth-strategy.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  exceptionService: CoreExceptionModel = new CoreExceptionModel(
    this.constructor.name,
  );

  constructor(
    readonly jwtService: JwtService,
    readonly authStrategyService: AuthStrategyService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _.get(jwtService, 'options.secret'),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(
    request: Request,
    userContext: UserContext,
    callback?: Function,
  ) {
    await this.authStrategyService.validateToken(request, userContext);
    return callback(null, userContext, false);
  }
}
