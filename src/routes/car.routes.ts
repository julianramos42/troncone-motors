import { Router } from 'express';
// schema
import validator from '../middlewares/validator';
import carCreationSchema from '../schemas/createOneCar';
// middlewares
import passport from '../middlewares/passport';
import upload from '../middlewares/multer-uploads';
import isAdmin from '../middlewares/users/isAdmin';
// controllers
import createOne from '../controllers/cars/createOne';
import getOne from '../controllers/cars/getOne';
import getAll from '../controllers/cars/getAll';
import deleteOne from '../controllers/cars/deleteOne';
import updateOne from '../controllers/cars/updateOne';

const router = Router();

router.get('/:id', getOne);
router.get('/', getAll);
router.post('/create', passport.authenticate('jwt',{session:false}), isAdmin, upload, validator(carCreationSchema), createOne);
router.put('/:id', passport.authenticate('jwt',{session:false}), isAdmin, upload, updateOne);
router.delete('/:id', passport.authenticate('jwt',{session:false}), isAdmin, deleteOne);

export default router;