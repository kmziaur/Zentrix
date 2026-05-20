import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createPaymentSession, getPaymentOrder, confirmPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-session", isAuthenticated, createPaymentSession);
router.get("/order/:orderId", isAuthenticated, getPaymentOrder);
router.post("/confirm/:orderId", isAuthenticated, confirmPayment);

export default router;
