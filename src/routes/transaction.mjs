import {ensureAuth} from "../middlewares/ensureAuth.mjs";
import {Router} from "express";
import TransactionController from "../controllers/transaction.controller.mjs";
const router = Router();

router.get('/', ensureAuth, await TransactionController.findAllByUserId);
router.post('/', ensureAuth, await TransactionController.create);

export default router;
