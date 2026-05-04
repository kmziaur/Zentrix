import express from "express";
import {
  allUser,
  forgotPassword,
  getUserById,
  login,
  logout,
  register,
  resetPassword,
  reVerify,
  verify,
  verifyOTP,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/all-user", isAuthenticated, isAdmin, allUser);
router.get("/get-user/:id", isAuthenticated, isAdmin, getUserById);

export default router;
