import type { NextFunction, Request, Response } from 'express';
import { rateLimiterMongo } from '../config/rateLimiter';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';

export default (req: Request, _: Response, next: NextFunction) => {
  if (rateLimiterMongo) {
    rateLimiterMongo
      .consume(req.ip as string, 1)
      .then(() => {
        next();
      })
      .catch(() => {
        httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429);
      });
  }
};
