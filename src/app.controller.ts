import { Get, Controller } from '@nestjs/common';
import { QtumService } from './qtum/qtum.service';
import { StorageService } from './storage/storage.service';
const { version, name } = require('../package.json') // require workaround

@Controller()
export class AppController {

  errorTimeout = 5000;
  blockTime = 60000;

  constructor(
    private readonly qtumService: QtumService,
    private readonly storageService: StorageService
  ) {}

  @Get()
  root(): any {
    return {
      version,
      name
    }
  }

  @Get('/stats')
  async stats(): Promise<any> {
    const [
      { lastBlock = null, lastModified = null },
      block
    ] = await Promise.all([
      this.storageService.qtumMeta(),
      this.qtumService.getCurrentHeight()
    ]);

    return {
      network: {
        block
      },
      sync: {
        lastBlock,
        lastModified
      }
    }
  }

  // @Deamon
  async sync() {
    try {

      const [
        { lastBlock = null, lastModified = null },
        block
      ] = await Promise.all([
        this.storageService.qtumMeta(),
        this.qtumService.getCurrentHeight()
      ]);

      const timeout = block && lastBlock && block === lastBlock ? this.blockTime : 0;
      const fetchBlock = lastBlock ? lastBlock + 1 : 1;
      const fetchedBlock = await this.qtumService.getBlockByNumber(fetchBlock);
      const addedBlock = await this.storageService.addBlock(fetchedBlock);
      const meta = await this.storageService.qtumMeta({ lastBlock: fetchBlock });

      console.log(`Synced ${ meta.lastBlock } block height`)

      setTimeout(() => this.sync(), timeout);
    } catch(e) {
      console.log(e);
      setTimeout(() => this.sync(), this.errorTimeout);
    }
  }
}
