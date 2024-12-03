import express from "express";
import {
  checkAuth,
  login,
  logout,
  signUp,
  deleteAccount,
} from "../controllers/auth.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/check-auth", verifyToken, checkAuth);
router.delete("/delete-account", verifyToken, deleteAccount);

export default router;
