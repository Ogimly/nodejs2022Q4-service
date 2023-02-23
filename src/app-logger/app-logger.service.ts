import { Injectable, LoggerService } from '@nestjs/common';
import { ConsoleColors, LogLevels } from '../common/enums';

@Injectable()
export class AppLoggerService implements LoggerService {
  private level: number;
  private currentTime: Date;

  constructor(level: number) {
    this.level = level;
  }

  public log(message: string, ...optionalParams: any[]) {
    if (this.level >= 0) {
      this.write(LogLevels.log, ConsoleColors.Green, message, optionalParams[0]);
    }
  }

  public error(message: string, ...optionalParams: any[]) {
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

  private write(nameStr: string, color: string, messageStr: string, optionalStr: string) {
    const past = this.currentTime;
    this.currentTime = new Date();
    const deltaTimeStr = past ? `+${this.currentTime.getTime() - past.getTime()}ms` : '';

    const pidStr = `[HLS] ${process.pid} -`;
    const timeStr = this.currentTime.toLocaleString();

    console.log(
      `${color}${pidStr}`,
      `${ConsoleColors.Reset}${timeStr}`,
      `${color}${nameStr}`,
      `${ConsoleColors.Reset}${optionalStr}`,
      `${color}${messageStr}`,
      `${ConsoleColors.Reset}${deltaTimeStr}`
    );
  }
}
