import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from './storage.service';
import { BlockSchema } from './schemas/block.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }])],
  providers: [StorageService],
})
export class StorageModule {}
