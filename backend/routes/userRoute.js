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
  updateUser,
  verify,
  verifyOTP,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";


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
router.put("/update/:id",isAuthenticated,singleUpload,updateUser);

export default router;
