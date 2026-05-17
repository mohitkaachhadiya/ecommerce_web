import express from "express";
import authRoutes from "./authRoutes.js";
import cartRoutes from "./cartRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

router.use(authRoutes);
router.use(cartRoutes);
router.use(productRoutes);

export default router;
