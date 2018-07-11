import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from './storage.service';
import { BlockSchema } from './schemas/block.schema';
import { MetaSchema } from './schemas/meta.schema';

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/qtum_test'),
        MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }]),
        MongooseModule.forFeature([{ name: 'Meta', schema: MetaSchema }])
      ],
      providers: [StorageService],
    }).compile();

    storageService = module.get<StorageService>(StorageService);
  });

  describe('MetaSchema Qtum', () => {
    const update = { currentBlock: 1 };

    it('qtumMeta(update)', async () => {
      const result = await storageService.qtumMeta(update)
      expect(result.get('currentBlock')).toEqual(update.currentBlock)
    })

    it('qtumMeta()', async () => {
      const result = await storageService.qtumMeta()
      expect(result.get('currentBlock')).toEqual(update.currentBlock)
    })
  })

  describe('BlockSchema', () => {
    it('addBlock(block)', async () => {
      const block = {
        hash: "test_block"
      };
      const result = await storageService.addBlock(block)
      expect(result.hash).toEqual(block.hash)
    });
  });
});
