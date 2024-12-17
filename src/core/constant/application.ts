export enum EApplicationEnvironment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const APPLICATION = {
  NAME: 'NodeJS TypeScript MongoDB API',
  VERSION: '1.0.0',
  DESCRIPTION: 'A production-ready Node.js API with TypeScript and MongoDB',

  // Log Levels
  LOG_LEVEL: {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
  },
};
