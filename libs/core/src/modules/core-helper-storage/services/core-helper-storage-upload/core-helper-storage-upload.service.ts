import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { CoreConfigKeysInterface } from '../../../../models';
import { CoreSharedService } from '../../../../services';
import { CoreEHelperStoreProviders } from '../../enum';
import {
  CoreHelperStorageUploadFileInterface,
  CoreHelperStorageUploadResponseInterface,
} from '../../interfaces';

@Injectable()
export class CoreHelperStorageUploadService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @Inject(CoreEHelperStoreProviders.AWS_S3_PROVIDER)
    private readonly s3: S3,
    private readonly configService: ConfigService<CoreConfigKeysInterface>,
  ) {
    super();
  }


  getEndpoint(): string {
    const { protocol, host } = this.s3.endpoint;
    return (
      protocol + '//' + this.configService.get('S3_BUCKET_NAME') + host + '/'
    );
  }
  
  uploadFile(
    file: CoreHelperStorageUploadFileInterface,
    modular: string,
    userId: number | string,
    callback?: Function,
    reject?: Function,
  ) {
    const filePath: string = [
      this.configService.get('NODE_ENV'),
      modular,
      userId,
      `${userId}-${Date.now()}.${file.mimetype.split('/')[1]}`,
    ].join('/');

    this.s3.putObject(
      {
        Key: filePath,
        ACL: 'public-read',
        Body: file.buffer,
        Bucket: this.configService.get('S3_BUCKET_NAME'),
      },
      (error, res: any) => {
        if (error) {
          if (reject) {
            return reject(error);
          }
        }
        if (callback) {
          return callback({
            ...res,
            url: filePath,
            type: file.mimetype,
            title: file.originalname,
            originName: file.originalname,
          });
        }
        return res;
      },
    );
  }

  uploadFileAsync(
    file: CoreHelperStorageUploadFileInterface,
    modular: string,
    userId: number | string,
  ): Promise<CoreHelperStorageUploadResponseInterface> {
    const filePath: string = [
      this.configService.get('NODE_ENV'),
      modular,
      userId,
      `${userId}-${Date.now()}.${file.mimetype.split('/')[1]}`,
    ].join('/');
    return new Promise((resolve, reject) =>
      this.s3.putObject(
        {
          Key: filePath,
          ACL: 'public-read',
          Body: file.buffer,
          Bucket: this.configService.get('S3_BUCKET_NAME'),
        },
        (error, res: any) => {
          if (error) {
            reject(error);
          }
          resolve({
            ...res,
            url: filePath,
            type: file.mimetype,
            title: file.originalname,
            originName: file.originalname,
          });
        },
      ),
    );
  }

  uploadFilesAsync<T>(files: any[], modular: string, userId?: number) {
    const promises = files.map((attachment, index) => {
      return new Promise((resolve, reject) => {
        const filePath: string = [
          this.configService.get('NODE_ENV'),
          modular,
          userId,
          `${attachment.fieldname}-${attachment.originalname}-${Date.now()}.${
            attachment.mimetype.split('/')[1]
          }`,
        ]
          .filter((x) => x !== undefined)
          .join('/');
        this.s3.putObject(
          {
            Key: filePath,
            ACL: 'public-read',
            Body: attachment.buffer,
            Bucket: this.configService.get('S3_BUCKET_NAME'),
          },
          (error, res: any) => {
            if (error) {
              reject(error);
              return;
            }
            resolve({
              ...res,
              ...attachment,
              url: filePath,
              index,
            } as T);
          },
        );
      });
    });

    return Promise.all(promises);
  }
}
