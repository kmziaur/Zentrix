import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
} from "../controllers/cartController.js";
import {isAuthenticated} from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.put("/update", isAuthenticated, updateQuantity);
router.delete("/remove", isAuthenticated, removeFromCart);



export default router;