import type { Request } from 'express';
import { EApplicationEnvironment } from '../config/application';
import config from '../config/config';
import responseMessage from '../config/responseMessage';
import type { tHttpError } from '../types/types';
import logger from './logger';

export default (err: Error | unknown, req: Request, errorStatusCode = 500): tHttpError => {
  const errorObj: tHttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message:
      err instanceof Error
        ? err.message || responseMessage.INTERNAL_SERVER_ERROR
        : responseMessage.INTERNAL_SERVER_ERROR,
    data: null,
  };

  // Only include stack trace in non-production environments
  if (err instanceof Error && config.ENV !== EApplicationEnvironment.PRODUCTION) {
    errorObj.stack = err.stack;
  }

  logger.error('❌ ERROR_OBJECT', {
    meta: errorObj,
  });

  return errorObj;
};
