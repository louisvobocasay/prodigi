import {
  CacheModule,
  CacheModuleOptions,
  Global,
  Module,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { create } from 'cache-manager-redis-store';
import { CoreConfigKeysInterface } from '../../models';
import { CoreHelperRedisService } from './core-helper-redis.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (
        config: ConfigService<CoreConfigKeysInterface>,
      ): CacheModuleOptions & {} => {
        return {
          store: {
            create: () => {
              const options = {
                keyPrefix: config.get('REDIS_KEY_PREFIX'),
                host: config.get('REDIS_HOST'),
                port: config.get('REDIS_PORT'),
                db: config.get('REDIS_DATABASE'),
              };
              return create(options);
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CoreHelperRedisService],
  exports: [CoreHelperRedisService],
})
export class CoreHelperRedisModule { }
