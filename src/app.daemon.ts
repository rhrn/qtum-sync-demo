import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppController } from './app.controller';

export async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appController = app.get(AppController);
  await appController.sync()
}
