import { Injectable } from '@nestjs/common';
import { ConfigService } from '../packages/config-nest';
import { HttpService } from '../packages/isomorphic-fetch-nest';

type json = any;

@Injectable()
export class QtumService {
  url: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.url = this.configService.get('QTUM_URL')
  }

  async rpc(cmd): Promise<json> {
    const options = {
      method: 'POST',
      body: JSON.stringify(cmd)
    };
    const response = await this.httpService.fetch(this.url, options)
    return response.json()
  }

  async getBlockHash(id): Promise<json> {
    const cmd = { method: 'getblockhash', params: [id] }
    const { result } = await this.rpc(cmd)
    return result
  }

  async getBlockByNumber(id): Promise<json> {
    const hash = await this.getBlockHash(id)
    const cmd = { method: 'getblock', params: [hash, 2] }
    const { result } = await this.rpc(cmd)
    return result
  }

  async getBlockchainInfo(): Promise<json> {
    const cmd = { method: 'getblockchaininfo' }
    const { result } = await this.rpc(cmd)
    return result
  }

  async getCurrentHeight(): Promise<number> {
    const { blocks } = await this.getBlockchainInfo()
    return blocks
  }

}
