import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestLog } from '../../common/interfaces';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { baseUrl, method, query, body } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const message: RequestLog = {
        method,
        baseUrl,
        query: JSON.stringify(query),
        body: JSON.stringify(body),
        statusCode,
        deltaTime: Date.now() - start,
      };

      if (statusCode < 400) {
        this.logger.log(message);
      } else {
        this.logger.error(message);
      }
    });

    next();
  }
}
