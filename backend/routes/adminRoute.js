import express from "express";
import { getDashboardData } from "../controllers/adminController.js";
import {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, isAdmin, getDashboardData);
router.get("/orders", isAuthenticated, isAdmin, getAllOrders);
router.get("/orders/user/:userId", isAuthenticated, isAdmin, getOrdersByUser);
router.get("/orders/:id", isAuthenticated, isAdmin, getOrderById);
router.put("/orders/status/:orderId", isAuthenticated, isAdmin, updateOrderStatus);

export default router;
