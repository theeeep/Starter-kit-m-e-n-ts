import type { NextFunction, Request, Response } from 'express';
import responseMessage from '../../../core/constant/responseMessage';
import httpError from '../../../core/utils/httpError';
import httpResponse from '../../../core/utils/httpResponse';

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      // Mock user data for now - this would typically come from an authenticated session
      const userData = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      httpResponse(res, req, 200, responseMessage.SUCCESS, userData);
    } catch (error) {
      httpError(next, error, req, 500);
    }
  },
};
