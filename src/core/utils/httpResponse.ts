import type { Request, Response } from 'express';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import type { tHttpResponse } from '../types/types';
import logger from './logger';

export default (
  res: Response,
  req: Request,
  responseStatusCode: number,
  responseMessage: string,
  data: unknown = null
): void => {
  const response: tHttpResponse = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message: responseMessage,
    data,
  };

  // Production environment check
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    response.request.ip = null;
  }

  // Log response
  logger.info('✨ HTTP_RESPONSE', {
    meta: response,
  });

  res.status(responseStatusCode).json(response);
};
