import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoreConfigKeysInterface } from '../../../../models';
import { CoreSharedService } from '../../../../services';

@Injectable()
export class CoreHelperStorageBaseService extends CoreSharedService {
  /**
   *
   */
  constructor(
    private readonly configService: ConfigService<CoreConfigKeysInterface>,
  ) {
    super();
  }

  mapS3Domain(path: string) {
    if (path) return this.configService.get('S3_BUCKET') + '/' + path;
    return path;
  }
}
