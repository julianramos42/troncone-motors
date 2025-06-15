import { Router } from 'express';
// schema
import validator from '../middlewares/validator';
import carCreationSchema from '../schemas/createOneCar';
// middlewares
import upload from '../middlewares/multer-uploads';
// controllers
import createOne from '../controllers/cars/createOne';
import getOne from '../controllers/cars/getOne';
import getAll from '../controllers/cars/getAll';
import deleteOne from '../controllers/cars/deleteOne';

const router = Router();

router.get('/:id', getOne);
router.get('/', getAll);
router.post('/create', upload, validator(carCreationSchema), createOne);
router.delete('/:id', deleteOne);

export default router;