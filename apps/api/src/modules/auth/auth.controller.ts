import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestDecorator, UserContextDecorator } from '../../decorators';
import { RequestContext, UserContext } from '../../models';
import { VAuthorizePayloadDto } from './dto';
import { AuthAuthorizeService } from './services/auth-authorize/auth-authorize.service';
import { AuthLogoutService } from './services/auth-logout/auth-logout.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(
    private readonly authAuthorizeService: AuthAuthorizeService,
    private readonly authLogoutService: AuthLogoutService,
  ) {}

  @Post()
  @ApiResponse({ type: String })
  @ApiOperation({ summary: 'Authorize user' })
  login(
    @RequestDecorator() requestContext: RequestContext,
    @Body() payload: VAuthorizePayloadDto,
  ) {
    return this.authAuthorizeService.authorize(requestContext, payload);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout' })
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(
    @RequestDecorator() requestContext: RequestContext,
    @UserContextDecorator() userContext: UserContext,
  ) {
    return this.authLogoutService.logout(requestContext, userContext);
  }
}
