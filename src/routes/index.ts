import { Router, Request, Response, NextFunction } from 'express';
import carRouter from './car.routes';
import userRouter from './user.routes'

const router = Router({ mergeParams: true });

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ message: 'API is running' })
});

router.use('/cars', carRouter);
router.use('/users', userRouter);

export default router;