import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, mkdir, readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import {
  DEFAULT_WRITE_LOG_FILE,
  LOG_DIR,
  DEFAULT_WRITE_ERROR_FILE,
  ERROR_DIR,
  DEFAULT_MAX_FILE_SIZE,
} from '../consts';
import { LogLevels, ConsoleColors } from '../enums';
import { isDirectory, isFileSizeOK } from '../helpers/file-helpers';
import { MessageLog } from '../interfaces';

@Injectable()
export class AppLoggerService implements LoggerService {
  private level: number;

  private currentTime: Date;

  private isWriteToLogFile = Number(process.env.WRITE_LOG_FILE) ?? DEFAULT_WRITE_LOG_FILE;
  private pathToLogFile = join(process.cwd(), LOG_DIR);
  private logFileName: string;

  private isWriteToErrorFile =
    Number(process.env.WRITE_ERROR_FILE) ?? DEFAULT_WRITE_ERROR_FILE;
  private pathToErrorFile = join(process.cwd(), LOG_DIR, ERROR_DIR);
  private errorFileName: string;

  private maxFileSize = Number(process.env.MAX_FILE_SIZE) ?? DEFAULT_MAX_FILE_SIZE;

  constructor(level: number) {
    this.level = level;
  }

  public async log(message: string | MessageLog, ...optionalParams: any[]) {
    if (this.level >= 0) {
      await this.write(LogLevels.log, ConsoleColors.Green, message, optionalParams[0]);
    }
  }

  public async error(message: string | MessageLog, ...optionalParams: any[]) {
    if (this.level >= 1) {
      await this.write(LogLevels.error, ConsoleColors.Red, message, optionalParams[1]);
    }
  }

  public async warn(message: string, ...optionalParams: any[]) {
    if (this.level >= 2) {
      await this.write(LogLevels.warn, ConsoleColors.Yellow, message, optionalParams[0]);
    }
  }

  public async debug(message: string, ...optionalParams: any[]) {
    if (this.level >= 3) {
      await this.write(
        LogLevels.debug,
        ConsoleColors.Magenta,
        message,
        optionalParams[0]
      );
    }
  }

  public async verbose(message: string, ...optionalParams: any[]) {
    if (this.level >= 4) {
      await this.write(LogLevels.verbose, ConsoleColors.Cyan, message, optionalParams[0]);
    }
  }

  private async write(
    logLevelStr: string,
    color: string,
    message: string | MessageLog,
    optional: string
  ) {
    const past = this.currentTime;
    this.currentTime = new Date();

    const pidStr = `[HLS] ${process.pid} -`;
    const timeStr = this.currentTime.toLocaleString();
    const { messageStr, deltaTime } = this.parseMessageStr(message);
    const optionalStr = `[${optional}]`;
    const deltaTimeStr = deltaTime
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

    if (this.isWriteToLogFile)
      await this.writeToLogFile(
        `${pidStr} ${timeStr} ${logLevelStr} ${optionalStr} ${messageStr} ${deltaTimeStr}\n`
      );

    if (logLevelStr === LogLevels.error && this.isWriteToErrorFile)
      await this.writeToErrorFile(
        `${pidStr} ${timeStr} ${logLevelStr} ${optionalStr} ${messageStr} ${deltaTimeStr}\n`
      );
  }

  public async initLogs() {
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

  private async createLogFile() {
    this.logFileName = join(this.pathToLogFile, `${LOG_DIR}-${Date.now()}.log`);
    await writeFile(this.logFileName, 'New log file started\n');
  }

  private async createErrorFile() {
    this.errorFileName = join(this.pathToErrorFile, `${ERROR_DIR}-${Date.now()}.log`);
    await writeFile(this.errorFileName, 'New log errors file started\n');
  }

  private async writeToLogFile(message: string) {
    const isOK = await isFileSizeOK(this.logFileName, this.maxFileSize);
    if (!isOK) await this.createLogFile();

    await appendFile(this.logFileName, message);
  }

  private async writeToErrorFile(message: string) {
    const isOK = await isFileSizeOK(this.errorFileName, this.maxFileSize);
    if (!isOK) await this.createErrorFile();

    await appendFile(this.errorFileName, message);
  }

  private parseMessageStr(message: string | MessageLog) {
    if (typeof message === 'string') return { messageStr: message, deltaTime: 0 };

    if (message.message) {
      return {
        messageStr: `Status code: ${message.statusCode} ${message.message}`,
        deltaTime: 0,
      };
    } else {
      return {
        messageStr: `${message.method} ${message.baseUrl}: Query params: ${message.query}, Body: ${message.body}, Status code: ${message.statusCode}`,
        deltaTime: message.deltaTime,
      };
    }
  }
}
