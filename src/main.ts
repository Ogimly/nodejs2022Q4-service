import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLoggerService } from './common/services/app-logger/app-logger.service';
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
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
};

const addListeners = (logger: AppLoggerService) => {
  process
    .on('unhandledRejection', async () => {
      logger.crash('Unhandled Rejection... Server will be restarted');
      process.exit(1);
    })
    .on('uncaughtException', async () => {
      logger.crash('Uncaught Exception... Server will be restarted');
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

  // setTimeout(
  //   () => Promise.reject(new Error('unhandledRejection test')),
  //   Math.random() * 10000
  // );
  // setTimeout(() => {
  //   throw new Error('uncaughtException test');
  // }, Math.random() * 10000);
}

bootstrap();
