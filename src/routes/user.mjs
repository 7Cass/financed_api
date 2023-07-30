import { Router } from 'express';

const router = Router();

import {ensureAuth} from "../middlewares/ensureAuth.mjs";
import userController from "../controllers/user.controller.mjs";
import authController from "../controllers/auth.controller.mjs";

router.get('/', ensureAuth, await userController.findAll);

router.get('/:id', ensureAuth, await userController.findById);

router.post('/register', await authController.register);

router.post('/login', await authController.login);

export default router;
