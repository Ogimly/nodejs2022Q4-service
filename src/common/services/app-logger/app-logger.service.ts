import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appendFileSync } from 'fs';
import { appendFile, mkdir, readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { LOG_DIR, ERROR_DIR } from '../../consts';
import { LogLevels, ConsoleColors } from '../../enums';
import { isDirectory, isFileSizeOK } from '../../helpers/file-helpers';
import { MessageLog } from '../../interfaces';

type ParsedMessage = {
  messageStr: string;
  deltaTime: string;
};

@Injectable()
export class AppLoggerService implements LoggerService {
  private level: number;

  private currentTime: Date;

  private isWriteToLogFile: number;
  private pathToLogFile = join(process.cwd(), LOG_DIR);
  private logFileName: string;

  private isWriteToErrorFile: number;
  private pathToErrorFile = join(process.cwd(), LOG_DIR, ERROR_DIR);
  private errorFileName: string;

  private maxFileSize: number;

  constructor(private config: ConfigService) {
    this.level = this.config.get<number>('logger.logLevel');
    this.isWriteToLogFile = this.config.get<number>('logger.writeToLogFile');
    this.isWriteToErrorFile = this.config.get<number>('logger.writeToErrorFile');
    this.maxFileSize = this.config.get<number>('logger.maxFileSize');
  }

  public async error(message: string | MessageLog, ...optional: string[]): Promise<void> {
    if (this.level >= 0) {
      await this.write(LogLevels.error, ConsoleColors.Red, message, optional[1]);
    }
  }

  public async warn(message: string | MessageLog, ...optional: string[]): Promise<void> {
    if (this.level >= 1) {
      await this.write(LogLevels.warn, ConsoleColors.Yellow, message, optional[0]);
    }
  }

  public async log(message: string | MessageLog, ...optional: string[]): Promise<void> {
    if (this.level >= 2) {
      await this.write(LogLevels.log, ConsoleColors.Green, message, optional[0]);
    }
  }

  public async verbose(
    message: string | MessageLog,
    ...optional: string[]
  ): Promise<void> {
    if (this.level >= 3) {
      await this.write(LogLevels.verbose, ConsoleColors.Cyan, message, optional[0]);
    }
  }

  public async debug(message: string | MessageLog, ...optional: string[]): Promise<void> {
    if (this.level >= 4) {
      await this.write(LogLevels.debug, ConsoleColors.Magenta, message, optional[0]);
    }
  }

  public crash(message: string, ...optional: string[]): void {
    this.write(LogLevels.error, ConsoleColors.Red, message, optional[0], true);
  }

  public async initLogs(): Promise<void> {
    if (this.isWriteToLogFile) {
      const isExist = await isDirectory(this.pathToLogFile);

      if (!isExist) {
        await mkdir(this.pathToLogFile);
        await this.createLogFile();
      } else {
        const files = (await readdir(this.pathToLogFile, { withFileTypes: true })).filter(
          (file) => file.isFile()
        );

        if (files.length === 0) {
          await this.createLogFile();
        } else {
          const lastFile = files[files.length - 1];
          this.logFileName = join(this.pathToLogFile, lastFile.name);
          await appendFile(this.logFileName, '\n');
        }
      }
    }

    if (this.isWriteToErrorFile) {
      const isExist = await isDirectory(this.pathToErrorFile);
      if (!isExist) {
        await mkdir(this.pathToErrorFile);
        await this.createErrorFile();
      } else {
        const files = (
          await readdir(this.pathToErrorFile, { withFileTypes: true })
        ).filter((file) => file.isFile());

        if (files.length === 0) {
          await this.createErrorFile();
        } else {
          const lastFile = files[files.length - 1];
          this.errorFileName = join(this.pathToErrorFile, lastFile.name);
        }
      }
    }
  }

  private async write(
    logLevelStr: string,
    color: string,
    message: string | MessageLog,
    optional: string,
    crash = false
  ): Promise<void> {
    const past = this.currentTime;
    this.currentTime = new Date();

    const pidStr = `[HLS] ${process.pid} -`;
    const timeStr = this.currentTime.toLocaleString();
    const { messageStr, deltaTime } = this.parseMessageStr(message);
    const optionalStr = `[${optional}]`;
    const deltaTimeStr =
      deltaTime === '-'
        ? ''
        : deltaTime
        ? `+${deltaTime}ms`
        : past
        ? `+${this.currentTime.getTime() - past.getTime()}ms`
        : '';

    console.log(
      `${color}${pidStr}`,
      `${ConsoleColors.Reset}${timeStr}`,
      `${color}${logLevelStr}`,
      `${ConsoleColors.Reset}${optionalStr}`,
      `${color}${messageStr}`,
      `${ConsoleColors.Reset}${deltaTimeStr}`
    );

    const messageForFile = `${pidStr} ${timeStr} ${logLevelStr} ${optionalStr} ${messageStr} ${deltaTimeStr}\n`;

    if (crash) {
      // sync writing on crash app
      if (this.isWriteToLogFile) appendFileSync(this.logFileName, messageForFile);
      if (this.isWriteToErrorFile) appendFileSync(this.errorFileName, messageForFile);
    } else {
      // async writing
      if (this.isWriteToLogFile) await this.writeToLogFile(messageForFile);
      if (logLevelStr === LogLevels.error && this.isWriteToErrorFile)
        await this.writeToErrorFile(messageForFile);
    }
  }

  private async createLogFile(): Promise<void> {
    this.logFileName = join(this.pathToLogFile, `${LOG_DIR}-${Date.now()}.log`);
    await writeFile(this.logFileName, 'New log file started\n');
  }

  private async createErrorFile(): Promise<void> {
    this.errorFileName = join(this.pathToErrorFile, `${ERROR_DIR}-${Date.now()}.log`);
    await writeFile(this.errorFileName, 'New log errors file started\n');
  }

  private async writeToLogFile(message: string): Promise<void> {
    const isOK = await isFileSizeOK(this.logFileName, this.maxFileSize);
    if (!isOK) await this.createLogFile();

    await appendFile(this.logFileName, message);
  }

  private async writeToErrorFile(message: string): Promise<void> {
    const isOK = await isFileSizeOK(this.errorFileName, this.maxFileSize);
    if (!isOK) await this.createErrorFile();

    await appendFile(this.errorFileName, message);
  }

  private parseMessageStr(message: string | MessageLog): ParsedMessage {
    if (typeof message === 'string') return { messageStr: message, deltaTime: '' };

    if (message.message) {
      return {
        messageStr: `Status code: ${message.statusCode} ${message.message}`,
        deltaTime: '-',
      };
    } else if (message.responseBody) {
      return {
        messageStr: `Body (response): ${message.responseBody}`,
        deltaTime: '-',
      };
    } else {
      return {
        messageStr: `${message.method} ${message.baseUrl}: Query params: ${message.query}, Body: ${message.requestBody}, Status code: ${message.statusCode}`,
        deltaTime: `${message.deltaTime}`,
      };
    }
  }
}
