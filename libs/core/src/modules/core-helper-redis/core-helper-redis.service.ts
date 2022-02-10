import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import { CoreSharedService } from '../../services';
import { CoreEHelperRedisKeys } from './enum/core-helper-redis-keys.enum';

@Injectable()
export class CoreHelperRedisService extends CoreSharedService {
  /**
   *
   */
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {
    super();
  }

  get<T = unknown>(key: string | CoreEHelperRedisKeys) {
    return this.cacheManager.get<T>(key);
  }

  set<T>(key: string | CoreEHelperRedisKeys, value: T, option?: CachingConfig) {
    return this.cacheManager.set<T>(key, value, option);
  }

  del(key: string | CoreEHelperRedisKeys) {
    return this.cacheManager.del(key);
  }

  async delByPrefix(prefix: string) {
    const keys = await this.cacheManager.store.keys(prefix);
    for (const key of keys) {
      await this.cacheManager.del(key);
    }
  }
}
