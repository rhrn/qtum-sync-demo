import { Module } from '@nestjs/common';
import { HttpModule } from '../packages/isomorphic-fetch-nest';
import { ConfigModule } from '../packages/config-nest';
import { QtumService } from './qtum.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [QtumService],
  exports: [QtumService],
})
export class QtumModule {}
