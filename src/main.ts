import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DEFAULT_LOG_LEVEL, DEFAULT_PORT } from './common/consts';
import { AppLoggerService } from './app-logger/app-logger.service';

const swaggerSetup = (port: number, app: INestApplication) => {
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
};

const addListeners = (logger: AppLoggerService) => {
  process
    .on('unhandledRejection', async () => {
      await logger.error('Unhandled Rejection...');
    })
    .on('uncaughtException', async () => {
      await logger.error('Uncaught Exception...');
      process.exit(1);
    });
};

async function bootstrap() {
  const logLevel = Number(process.env.LOG_LEVEL) ?? DEFAULT_LOG_LEVEL;
  const port = Number(process.env.PORT) ?? DEFAULT_PORT;

  // const app = await NestFactory.create(AppModule);
  const logger = new AppLoggerService(logLevel);
  await logger.initLogs();

  const app = await NestFactory.create(AppModule, { logger });

  swaggerSetup(port, app);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  addListeners(logger);

  await app.listen(port);

  // setTimeout(() => Promise.reject(new Error('unhandledRejection test')), 5000);
  // setTimeout(() => {
  //   throw new Error('uncaughtException test');
  // }, 10000);
}

bootstrap();
