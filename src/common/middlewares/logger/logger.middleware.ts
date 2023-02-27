import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MessageLog } from '../../interfaces';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { baseUrl, method, query, body } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const message: MessageLog = {
        method,
        baseUrl,
        query: JSON.stringify(query),
        requestBody: JSON.stringify(body),
        statusCode,
        deltaTime: `${Date.now() - start}`,
      };

      if (statusCode < 400) {
        this.logger.log(message);
      } else if (statusCode < 500) {
        this.logger.warn(message);
      } else {
        this.logger.error(message);
      }
    });

    next();
  }
}
