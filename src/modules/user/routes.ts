import { Router } from 'express';
import userController from './controllers/userController';

const router = Router();

router.get('/self', userController.self);

export default router;
