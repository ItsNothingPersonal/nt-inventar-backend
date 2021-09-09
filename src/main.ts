import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger('Main'),
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
