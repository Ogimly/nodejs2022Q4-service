import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DEFAULT_LOG_LEVEL, DEFAULT_PORT } from './common/consts';
import { AppLoggerService } from './app-logger/app-logger.service';

async function bootstrap() {
  const logLevel = Number(process.env.LOG_LEVEL) ?? DEFAULT_LOG_LEVEL;
  const port = process.env.PORT ?? DEFAULT_PORT;

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService(logLevel),
  });

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service API description')
    .addServer(`http://localhost:${port}/`)
    .addTag('Users')
    .addTag('Artists')
    .addTag('Albums')
    .addTag('Tracks')
    .addTag('Favorites')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(port);
}
bootstrap();
