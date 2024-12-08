import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Cấu hình view engine là EJS
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
bootstrap();
