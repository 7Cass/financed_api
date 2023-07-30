import { Router } from 'express';
import {ensureAuth} from "../middlewares/ensureAuth.mjs";
import WalletController from "../controllers/wallet.controller.mjs";

const router = Router();

router.get('/', ensureAuth, await WalletController.findAll);
router.get('/:id', ensureAuth, await WalletController.findById);
router.post('/', ensureAuth, await WalletController.create);

export default router;
