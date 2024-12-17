import path from 'node:path';
import util from 'node:util';
import 'winston-mongodb';
import { blue, gray, green, magenta, red, white, yellow } from 'colorette';
import * as sourceMapSupport from 'source-map-support';
import { createLogger, format, transports } from 'winston';
import type { MongoDBTransportInstance } from 'winston-mongodb';
import type {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';

sourceMapSupport.install();

const colorizeLevel = (level: string) => {
  switch (level) {
    case 'ERROR':
      return red(level);
    case 'WARN':
      return yellow(level);
    case 'INFO':
      return blue(level);
    case 'VERBOSE':
      return green(level);
    case 'DEBUG':
      return magenta(level);
    case 'SILLY':
      return white(level);
    default:
      return gray(level);
  }
};

const consoleLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const customLevel = colorizeLevel(level.toUpperCase());
  const customTimestamp = yellow(timestamp as string);
  const customMessage = message as string;

  const customMeta = util.inspect(meta, {
    showHidden: false,
    depth: null,
    colors: true,
  });

  const customLog = `${customLevel} [${customTimestamp}] ${customMessage} \n${magenta('META')}  ${customMeta}`;

  return customLog;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), consoleLogFormat),
      }),
    ];
  }
  return [];
};

const fileLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const logMeta: Record<string, unknown> = {};
  const metaObject = meta as Record<string, unknown>;

  for (const [key, value] of Object.entries(metaObject)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        stack: value.stack || '',
      };
    } else {
      logMeta[key] = value;
    }
  }

  const logData = {
    level: level.toUpperCase(),
    message: message as string,
    timestamp,
    meta: logMeta,
  };
  return JSON.stringify(logData, null, 4);
});

const FileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
      level: 'info',
      format: format.combine(format.timestamp(), fileLogFormat),
    }),
  ];
};

const MongoDBTransport = (): Array<MongoDBTransportInstance> => {
  return [
    new transports.MongoDB({
      db: config.DATABASE_URL,
      level: 'info',
      metaKey: 'meta',
      expireAfterSeconds: 3600 * 24 * 30, // 30 days
      collection: 'application-logs',
    }) as MongoDBTransportInstance,
  ];
};

const logger = createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...consoleTransport(), ...FileTransport(), ...MongoDBTransport()],
});

export default logger;
