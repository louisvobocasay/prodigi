import { Controller, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoreHelperStorageUploadFileInterface } from '../../../../../libs/core/src/modules/core-helper-storage';
import { ApiFileDecorator, ExtraHeadersDecorator, RequestDecorator, UserContextDecorator } from '../../decorators';
import { RequestContext, UserContext } from '../../models';
import { VUploadMediaDto } from './dto';
import { MediaUploadService } from './services/medias-upload/medias-upload.service';

@Controller('medias')
@ExtraHeadersDecorator()
@ApiTags('Media Module')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class MediaController {
  /**
   *
   */
  constructor(
    readonly mediasUploadService: MediaUploadService
  ) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiFileDecorator('file')
  @ApiOperation({ summary: 'Upload media for all modules' })
  uploadSingleFile(
    @RequestDecorator() requestContext: RequestContext,
    @UserContextDecorator() userContext: UserContext,
    @UploadedFile() file: CoreHelperStorageUploadFileInterface,
    @Query() param: VUploadMediaDto,
  ) {
    return this.mediasUploadService.uploadFile(
      requestContext,
      userContext,
      file,
      param,
    );
  }
}
