import express from "express";
import {
  addToCart,
  decQty,
  deleteCart,
  getCart,
  incQty,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/home/addtocart/:userId", isAuthenticated, addToCart);
router.get("/home/getcart/:userId", isAuthenticated, getCart);
router.post("/home/deletecartitem/:userId", isAuthenticated, deleteCart);
router.post("/incQty/:userId", isAuthenticated, incQty);
router.post("/decQty/:userId", isAuthenticated, decQty);

export default router;
