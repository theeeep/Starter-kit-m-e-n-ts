import mongoose, { type Connection } from 'mongoose';
import config from '../config/config';
import logger from '../utils/logger';

const dbService = {
  connect: async (): Promise<Connection> => {
    try {
      await mongoose.connect(config.DATABASE_URL);
      logger.info('✨ DATABASE_CONNECTION_SUCCESS', {
        meta: {
          CONNECTION_NAME: mongoose.connection.name,
        },
      });
      return mongoose.connection;
    } catch (error) {
      logger.error('❌ DATABASE_CONNECTION_ERROR', {
        meta: error,
      });
      throw error;
    }
  },

  disconnect: async (): Promise<void> => {
    try {
      await mongoose.disconnect();
      logger.info('✨ DATABASE_DISCONNECTED');
    } catch (error) {
      logger.error('❌ DATABASE_DISCONNECT_ERROR', {
        meta: error,
      });
      throw error;
    }
  },
};

export default dbService;
