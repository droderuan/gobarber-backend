import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

import IStorageProvider from './models/IStorageProvider';

const uploadProviders = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  uploadProviders[uploadConfig.driver],
);
