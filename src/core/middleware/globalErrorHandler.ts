import type { NextFunction, Request, Response } from 'express';
import type { tHttpError } from '../types/types';

// Global Error Handler
export default (err: tHttpError, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode || 500).json(err);
};
