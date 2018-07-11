import { Test } from '@nestjs/testing';
import { HttpModule } from '../packages/isomorphic-fetch-nest';
import { ConfigModule } from '../packages/config-nest';
import { QtumService } from './qtum.service';

import nock, { back } from 'nock';
back.fixtures = __dirname + '/nock_fixtures';
back.setMode('record');

describe('QtumService', () => {

  let recordDone;
  let qtumService: QtumService;

  beforeAll(async () => {
    const { nockDone } = await back('qtum.service.spec.json')
    recordDone = nockDone
  })

  afterAll(async () => {
    await recordDone()
  })

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [QtumService],
      imports: [HttpModule, ConfigModule]
    }).compile();

    qtumService = module.get<QtumService>(QtumService);
  })

  describe('getCurrentHeight', () => {
    it('init', async () => {
      const height = await qtumService.getCurrentHeight();
      expect(height).toEqual(187230)
    })
  })

  describe('getBlockHash', () => {
    it('first', async () => {
      const hash = await qtumService.getBlockHash(1);
      expect(hash).toEqual('0000d5dab5e76310ae640e9bcfa270c2eb23a1e5948bdf01fc7ed1f157110ab7')
    })
  })

  describe('getBlockByNumber', () => {
    it('first', async () => {
      const block = await qtumService.getBlockByNumber(187213);
      expect(block.hash).toEqual('e46bc36d172bb52a6dfb45ececbaf8b5c2e2f502a6a1fdffd89cde9478b74580')
    })
  })

})
