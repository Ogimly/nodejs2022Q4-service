import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  logLevel: parseInt(process.env.LOG_LEVEL) || 5,
  writeToLogFile: parseInt(process.env.WRITE_LOG_FILE) || 1,
  writeToErrorFile: parseInt(process.env.WRITE_ERROR_FILE) || 1,
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 1024,
}));
