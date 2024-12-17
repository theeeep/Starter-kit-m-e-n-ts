import { Router } from 'express';
import healthRoutes from '../modules/health/routes';
import userRoutes from '../modules/user/routes';

const v1Router = Router();

// Features will be imported and added here
// Example: v1Router.use('/auth', authRoutes);

// Health check endpoint
v1Router.use('/health', healthRoutes);

// User endpoints
v1Router.use('/', userRoutes);

export default v1Router;
