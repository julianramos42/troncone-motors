import { Router } from 'express';
// schema
import validator from '../middlewares/validator';
import userCreationSchema from '../schemas/createUser';
import userLoginSchema from '../schemas/loginUser';
// middlewares
import passport from '../middlewares/passport';
import usernameExists from '../middlewares/users/usernameExists';
import accountExistsSignUp from '../middlewares/users/accountExistsSignUp';
// controllers
import createOne from '../controllers/users/createOne';
import getOne from '../controllers/users/getOne';
import adminUser from '../controllers/users/adminUser';

const router = Router();

router.get('/admin', passport.authenticate('jwt',{session:false}), adminUser);
router.post('/register', validator(userCreationSchema), usernameExists, accountExistsSignUp, createOne);
router.post('/login', validator(userLoginSchema), getOne);

export default router;