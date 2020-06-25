import { container } from 'tsyringe';

import RedisCacheProvider from './implementations/RedisCacheProvider';

import ICacheProvider from './models/ICacheProvider';

const cacheProviders = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  cacheProviders.redis,
);
