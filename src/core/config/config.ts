import dotenvFlow from 'dotenv-flow';

// Load environment variables based on NODE_ENV
dotenvFlow.config();

interface Config {
  ENV: string;
  PORT: number;
  DATABASE_URL: string;
  LOG_LEVEL: string;
  RATE_LIMIT: {
    windowMs: number;
    max: number;
  };
}

const config: Config = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/ts-backend',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};

export default config;
