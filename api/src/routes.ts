import { Router } from 'express';
import { CustomerController, OptimizeRouteController } from './controller';

export const router = Router();

router.use('/customer', CustomerController);
router.use('/optimize-route', OptimizeRouteController);
