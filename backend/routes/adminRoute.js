import express from "express";
import { getDashboardData } from "../controllers/adminController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, isAdmin, getDashboardData);

export default router;
