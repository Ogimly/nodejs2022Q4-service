import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MessageLog } from '../interfaces';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AppExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let statusCode: number;
    let message: string;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';

      const messageLog: MessageLog = {
        statusCode,
        message,
      };
      this.logger.error(messageLog);
    }

    ctx.getResponse().status(statusCode).json({
      statusCode,
      message,
    });
  }
}
