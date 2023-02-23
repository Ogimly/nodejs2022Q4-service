import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);

  use(req: any, res: any, next: () => void) {
    const { baseUrl, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const message = `URL: ${baseUrl}, Query params: ${JSON.stringify(
        query
      )}, Body: ${JSON.stringify(body)}, Status code: ${statusCode}`;

      if (statusCode < 400) {
        this.logger.log(message);
      } else {
        this.logger.error(message);
      }
    });

    next();
  }
}
