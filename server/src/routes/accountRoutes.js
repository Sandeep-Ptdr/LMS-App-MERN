import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  changePassword,
  getMyAccount,
  updateMyAccount,
} from "../controllers/accountController.js";

const router = Router();

router.get("/account", authenticateToken, getMyAccount);
router.put("/account", authenticateToken, updateMyAccount);
router.put("/account/password", authenticateToken, changePassword);

export default router;
