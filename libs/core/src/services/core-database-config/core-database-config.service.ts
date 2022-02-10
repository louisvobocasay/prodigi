import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CoreConfigKeysInterface } from '../../models';

@Injectable()
export class CoreDatabaseConfigService implements TypeOrmOptionsFactory {
  private _migrationFilesPath: string;
  private _entityFilesPath: string;

  /**
   *
   */
  constructor(
    private readonly configService: ConfigService<CoreConfigKeysInterface>,
  ) {
    this._migrationFilesPath = path.join(
      __dirname,
      '../../../migrations/*{.ts,.js}',
    );
    this._entityFilesPath = path.join(
      __dirname,
      '../../../**/*.entity{.ts,.js}',
    );
  }

  private get _shouldMigrate(): boolean {
    return (
      this.configService.get('RUN_MIGRATION') === 'true' ||
      this.configService.get('RUN_MIGRATION') === true
    );
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_CONNECTION_HOST'),
      port: this.configService.get('DATABASE_CONNECTION_PORT'),
      username: this.configService.get('DATABASE_CONNECTION_USERNAME'),
      password: this.configService.get('DATABASE_CONNECTION_PASSWORD'),
      database: this.configService.get('DATABASE_DATABASE_NAME'),
      migrationsTableName: this.configService.get('DATABASE_MIGRATION_TABLE'),
      entities: [this._entityFilesPath],
      migrations: [this._migrationFilesPath],
      synchronize: this._shouldMigrate,
      migrationsRun: this._shouldMigrate,
      namingStrategy: new SnakeNamingStrategy(),
      logger: 'advanced-console',
      logging: false,
    };
  }
}
