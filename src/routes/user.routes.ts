import { Router } from 'express';
// schema
import validator from '../middlewares/validator';
import userCreationSchema from '../schemas/createUser';
import userLoginSchema from '../schemas/loginUser';
// middlewares
import usernameExists from '../middlewares/users/usernameExists';
import accountExistsSignUp from '../middlewares/users/accountExistsSignUp';
// controllers
import createOne from '../controllers/users/createOne';
import getOne from '../controllers/users/getOne';

const router = Router();

router.post('/register', validator(userCreationSchema), usernameExists, accountExistsSignUp, createOne);
router.post('/login', validator(userLoginSchema), getOne);

export default router;