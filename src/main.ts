import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application/application.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, {
    cors: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Food Commerce Api')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentation', app, documentFactory);

  await app.listen(8000);
}
bootstrap();
