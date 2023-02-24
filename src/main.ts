import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLoggerService } from './common/app-logger/app-logger.service';
import { ConfigService } from '@nestjs/config';

const swaggerSetup = (port: number, app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service API description')
    .addServer(`http://localhost:${port}/`)
    .addTag('Auth')
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
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const logger = new AppLoggerService(config);
  await logger.initLogs();
  app.useLogger(logger);

  const port = config.get<number>('app.port');

  swaggerSetup(port, app);

  app.enableCors();

  addListeners(logger);

  await app.listen(port);

  // setTimeout(() => Promise.reject(new Error('unhandledRejection test')), 5000);
  // setTimeout(() => {
  //   throw new Error('uncaughtException test');
  // }, 10000);
}

bootstrap();
