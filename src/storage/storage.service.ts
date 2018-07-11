import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

type Block = any;
type Meta = any;
type CreateBlockDto = any;

@Injectable()
export class StorageService {
  constructor(
    @InjectModel('Meta') private readonly metaModel: Model<Meta>,
    @InjectModel('Block') private readonly blockModel: Model<Block>
  ) {}

  qtumMeta(update: any): Promise<Meta> {
    if (!update) {
      return this.metaModel.getQtumMeta()
    }
    return this.metaModel.updateQtumMeta(update)
  }

  async addBlock(createBlockDto: CreateBlockDto): Promise<Block> {
    const createdBlock = new this.blockModel(createBlockDto);
    return await createdBlock.save();
  }

}
