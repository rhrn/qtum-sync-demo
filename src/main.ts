import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap as runDaemon } from './app.daemon';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Listen on http://locahost:${ port }`);
  runDaemon()
}
bootstrap();
