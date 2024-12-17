import { Router } from 'express';
import type { RequestHandler } from 'express';
import { HealthController } from './controllers/healthController';

const router = Router();
const healthController = new HealthController();

const healthHandler: RequestHandler = async (_req, res, next) => {
  try {
    const result = await healthController.check();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

router.get('/', healthHandler);

export default router;
