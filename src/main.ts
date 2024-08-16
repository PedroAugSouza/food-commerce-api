import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application/application.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {
    cors: true,
  });
  await app.listen(3000);
}
bootstrap();
