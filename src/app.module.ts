import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QtumModule } from './qtum/qtum.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [QtumModule, StorageModule],
  controllers: [AppController]
})
export class AppModule {}
