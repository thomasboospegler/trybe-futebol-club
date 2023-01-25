import * as express from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares';
import TokenHandler from '../utils/TokenHandler';

const userRouter = express.Router();

const userController = new UserController();

const tokenHandler = new TokenHandler();

userRouter.post('/', validateUser, userController.login);

userRouter.get('/validate', tokenHandler.validateJWT, userController.getRole);

export default userRouter;
