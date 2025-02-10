import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from '../validation/auth.js';
import * as authController from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(authController.registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(authController.loginUserController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(authController.refreshSessionController),
);

authRouter.post('/logout', ctrlWrapper(authController.logoutUserController));

authRouter.patch(
  '/',
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(authController.updateUserController),
);

export default authRouter;
