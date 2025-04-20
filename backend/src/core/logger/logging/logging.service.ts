import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggingService {
  private logger: winston.Logger;

  constructor() {
    // Configuración del logger
    const dir = join(__dirname, '../', 'log');

    console.log(dir);

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: dir, // Carpeta donde se guardarán los logs
          filename: 'globr-%DATE%.log', // Formato del archivo
          datePattern: 'YYYY-MM-DD', // Nuevo archivo por día
          maxSize: '2m', // Tamaño máximo del archivo
          maxFiles: '30d', // Mantener archivos por 30 días
        }),
        // new winston.transports.Console(), // Opcional: también muestra logs en la consola
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
