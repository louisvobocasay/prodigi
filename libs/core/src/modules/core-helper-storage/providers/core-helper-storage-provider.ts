import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { CoreConfigKeysInterface } from '../../../models';
import { CoreEHelperStoreProviders } from '../enum';

export const CoreHelperStorageProvider: Provider = {
  provide: CoreEHelperStoreProviders.AWS_S3_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService<CoreConfigKeysInterface>) => {
    const options: S3.ClientConfiguration = {
      accessKeyId: configService.get('S3_KEY_ID'),
      secretAccessKey: configService.get('S3_ACCESS_ID'),
      region: configService.get('S3_REGION'),
    };
    return new S3(options);
  },
};
