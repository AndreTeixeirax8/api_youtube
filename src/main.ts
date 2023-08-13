import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  await app.listen(3000);
  console.log("Servidor rodado na porta 3000 ")
}
bootstrap();
