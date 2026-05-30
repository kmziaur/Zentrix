import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createPaymentSession,
  getPaymentOrder,
  confirmPayment,
  handleStripeWebhook,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-session", isAuthenticated, createPaymentSession);
router.get("/order/:orderId", isAuthenticated, getPaymentOrder);
router.post("/confirm/:orderId", isAuthenticated, confirmPayment);
router.post("/stripe/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;
