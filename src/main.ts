import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TO USE THE INCOMMING DATA VALIDATION ERROR
  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalPipes(
  // new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //   }),
  // );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
