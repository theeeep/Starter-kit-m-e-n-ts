import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import responseMessage from '../constant/responseMessage';
import httpError from '../utils/httpError';

export const zodValidationErrorMiddleware = (
  error: Error,
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const validationError = new Error(
      `${responseMessage.VALIDATION_ERROR}: ${error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ')}`
    );
    return httpError(next, validationError, req, 400);
  }
  next(error);
};
