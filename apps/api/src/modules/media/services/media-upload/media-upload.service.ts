import { Injectable } from '@nestjs/common';
import {
  CoreHelperStorageUploadFileInterface,
  CoreHelperStorageUploadService,
  CoreMediaCreateService,
  CoreSharedService,
} from '@online-festival/core';
import { RequestContext, UserContext } from '../../../../models';
import { VUploadMediaDto } from '../../dto';

@Injectable()
export class MediaUploadService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly coreStorageUploadService: CoreHelperStorageUploadService,
    private readonly coreMediaCreateService: CoreMediaCreateService,
  ) {
    super();
  }

  async uploadFile(
    requestContext: RequestContext,
    userContext: UserContext,
    file: CoreHelperStorageUploadFileInterface,
    param: VUploadMediaDto,
  ) {
    const uploadedImagage = await this.coreStorageUploadService.uploadFileAsync(
      file,
      param.moduleName,
      userContext.id,
    );
    const media = await this.coreMediaCreateService.createMedia(
      file.originalname,
      uploadedImagage.url,
      file.size,
      file.mimetype,
    );
    return {
      url: uploadedImagage.url,
      fullPath:
        this.coreStorageUploadService.getEndpoint() + uploadedImagage.url,
      id: media.id,
      name: media.name
    };
  }
}
