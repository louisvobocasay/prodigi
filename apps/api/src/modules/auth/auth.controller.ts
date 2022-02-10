import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestDecorator } from '../../decorators';
import { RequestContext } from '../../models';
import { VAuthorizePayloadDto } from './dto';
import { AuthAuthorizeService } from './services/auth-authorize/auth-authorize.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(
    private readonly authAuthorizeService: AuthAuthorizeService
  ) {
  }

  @Post()
  @ApiResponse({ type: String })
  @ApiOperation({ summary: 'Authorize user' })
  login(
    @RequestDecorator() requestContext: RequestContext,
    @Body() payload: VAuthorizePayloadDto
  ) {
    return this.authAuthorizeService.authorize(requestContext, payload);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout' })
  logout() {

  }
}
