import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, mkdir, readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import {
  DEFAULT_WRITE_LOG_FILE,
  DEFAULT_WRITE_ERROR_FILE,
  LOG_DIR,
  ERROR_DIR,
} from '../common/consts';
import { ConsoleColors, LogLevels } from '../common/enums';
import { isDirectory } from '../common/helpers/file-helpers';
import { RequestLog } from '../common/interfaces';

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

  constructor(level: number) {
    this.level = level;
  }

  public log(message: string | RequestLog, ...optionalParams: any[]) {
    if (this.level >= 0) {
      this.write(LogLevels.log, ConsoleColors.Green, message, optionalParams[0]);
    }
  }

  public error(message: string | RequestLog, ...optionalParams: any[]) {
    if (this.level >= 1) {
      this.write(LogLevels.error, ConsoleColors.Red, message, optionalParams[1]);
    }
  }

  public warn(message: string, ...optionalParams: any[]) {
    if (this.level >= 2) {
      this.write(LogLevels.warn, ConsoleColors.Yellow, message, optionalParams[0]);
    }
  }

  public debug(message: string, ...optionalParams: any[]) {
    if (this.level >= 3) {
      this.write(LogLevels.debug, ConsoleColors.Magenta, message, optionalParams[0]);
    }
  }

  public verbose(message: string, ...optionalParams: any[]) {
    if (this.level >= 4) {
      this.write(LogLevels.verbose, ConsoleColors.Cyan, message, optionalParams[0]);
    }
  }

  private write(
    nameStr: string,
    color: string,
    message: string | RequestLog,
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
      `${color}${nameStr}`,
      `${ConsoleColors.Reset}${optionalStr}`,
      `${color}${messageStr}`,
      `${ConsoleColors.Reset}${deltaTimeStr}`
    );

    if (this.isWriteToLogFile)
      this.writeToLogFile(
        `${pidStr} ${timeStr} ${nameStr} ${optionalStr} ${messageStr} ${deltaTimeStr}\n`
      );

    if (nameStr === LogLevels.error && this.isWriteToErrorFile)
      this.writeToErrorFile(
        `${pidStr} ${timeStr} ${nameStr} ${optionalStr} ${messageStr} ${deltaTimeStr}\n`
      );
  }

  public async initLogs() {
    if (this.isWriteToLogFile) {
      const isExist = await isDirectory(this.pathToLogFile);

      if (!isExist) {
        await mkdir(this.pathToLogFile);
        await this.createLogFile();
      } else {
        const files = await readdir(this.pathToLogFile, { withFileTypes: true });

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
        const files = await readdir(this.pathToErrorFile, { withFileTypes: true });

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
    await appendFile(this.logFileName, message);
  }

  private async writeToErrorFile(message: string) {
    await appendFile(this.errorFileName, message);
  }

  private parseMessageStr(message: string | RequestLog) {
    if (typeof message === 'string') return { messageStr: message, deltaTime: 0 };
    return {
      messageStr: `${message.method} ${message.baseUrl}: Query params: ${message.query}, Body: ${message.body}, Status code: ${message.statusCode}`,
      deltaTime: message.deltaTime,
    };
  }
}
