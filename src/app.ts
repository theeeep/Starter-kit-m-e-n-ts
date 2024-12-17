import path from 'node:path';
import cors from 'cors';
import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import apiRouter from './api';
import responseMessage from './core/config/responseMessage';
import globalErrorHandler from './core/middleware/globalErrorHandler';
import httpError from './core/utils/httpError';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', apiRouter);

// Not Found
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND(req.originalUrl));
  } catch (err) {
    httpError(next, err, req, 404);
  }
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
