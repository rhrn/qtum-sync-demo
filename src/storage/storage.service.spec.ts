import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from './storage.service';
import { BlockSchema } from './schemas/block.schema';
import { MetaSchema } from './schemas/meta.schema';

describe('StorageService', () => {
  let storageService: StorageService;

  beforeAll(async () => {
    await Promise.all([
      BlockSchema.remove({}),
      MetaSchema.remove({}),
    ]);
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/qtum_test'),
        MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }]),
        MongooseModule.forFeature([{ name: 'Meta', schema: MetaSchema }]),
      ],
      providers: [StorageService],
    }).compile();

    storageService = module.get<StorageService>(StorageService);
  });

  describe('MetaSchema Qtum', () => {
    const update = { currentBlock: 1 };

    it('qtumMeta(update)', async () => {
      const result = await storageService.qtumMeta(update);
      expect(result.currentBlock).toEqual(update.currentBlock);
    });

    it('qtumMeta()', async () => {
      const result = await storageService.qtumMeta();
      expect(result.currentBlock).toEqual(update.currentBlock);
    });
  });

  describe('BlockSchema', () => {
    describe('addBlock', () => {
      const height = 42;

      it('addBlock(block) add', async () => {
        const block = {
          height,
          hash: 'test_block',
        };
        const result = await storageService.addBlock(block);
        expect(result.height).toEqual(block.height);
        expect(result.hash).toEqual(block.hash);
      });

      it('addBlock(block) upsert', async () => {
        const block = {
          height,
          hash: 'new_test_block',
        };
        const result = await storageService.addBlock(block);
        expect(result.height).toEqual(block.height);
        expect(result.hash).toEqual(block.hash);
      });
    });
  });
});
