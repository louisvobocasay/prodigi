import {
  DynamicModule,
  ForwardReference,
  Module,
  OnModuleInit,
  Type,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { CoreDatabaseConfigService } from './services';

import * as path from 'path';
import * as pg from 'pg';
import * as moment from 'moment';
import { CoreHelperStorageModule } from './modules/core-helper-storage';
import { CoreHelperRedisModule } from './modules/core-helper-redis';


const envFilePath: string = path.resolve(
  __dirname,
  '../../core/env',
  (process.env.NODE_ENV || '') + '.env',
);
const i18nFilePath: string = path.resolve(__dirname, '../../core/i18n/');

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: i18nFilePath,
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: CoreDatabaseConfigService,
    }),
    CoreHelperStorageModule,
    CoreHelperRedisModule
  ]
})
export class OnlineFestivalCoreModule implements OnModuleInit {
  static forRoot(
    imports?: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >,
  ): DynamicModule {
    return {
      global: true,
      module: OnlineFestivalCoreModule,
      imports,
    };
  }

  onModuleInit() {
    moment.updateLocale('en', {
      week: { dow: 1 },
    });

    pg.types.setTypeParser(1700, (value: string) => {
      if (value !== null) {
        return parseFloat(value);
      }
      return value;
    });

    pg.types.setTypeParser(20, (value: string) => {
      if (value !== null) {
        return parseInt(value);
      }
      return value;
    });
  }
}
