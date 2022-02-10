import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CoreEException, CoreExceptionContextWithEnumModel } from '@online-festival/core';
import { ApiEMediaUploadModules } from '../enum';

export class VUploadMediaDto {
  @ApiProperty({ required: true, enum: ApiEMediaUploadModules })
  @IsEnum(ApiEMediaUploadModules, {
    message: CoreEException.INVALID_VALUE,
    context: new CoreExceptionContextWithEnumModel(ApiEMediaUploadModules),
  })
  moduleName: ApiEMediaUploadModules;
}
