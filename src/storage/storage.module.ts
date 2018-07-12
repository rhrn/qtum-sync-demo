import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from './storage.service';
import { BlockSchema } from './schemas/block.schema';
import { MetaSchema } from './schemas/meta.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost/qtum_test'),
    MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }]),
    MongooseModule.forFeature([{ name: 'Meta', schema: MetaSchema }])
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
