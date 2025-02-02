import winston from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${level.toUpperCase()}] [${timestamp}] ${message}`;
  })
);

const errorTransport = new winston.transports.File({
  filename: path.join(__dirname, '/../../logs/error.log'),
  level: 'error',
  format: logFormat, // Plain text logs
});

const consoleTransport = new winston.transports.Console({
  format: logFormat, // Same format for console logs
});

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [consoleTransport, errorTransport], // Log everything to console, errors to file
});

// Ensure error logs are stored properly
logger.on('error', (err) => {
  if (!logger.transports.includes(errorTransport)) {
    logger.add(errorTransport);
  }
});

export default logger;
