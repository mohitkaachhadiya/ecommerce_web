import express from "express";
import {
  Search,
  addProduct,
  deleteProduct,
  filter,
  pagination,
  product,
  products,
  reviewsubmit,
  updateProduct,
  uploadImage,
} from "../controllers/productController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/authMiddleware.js";
import { uploadProductImage } from "../middleware/uploadMiddleware.js";
import { validateRequired } from "../middleware/validateRequest.js";

const router = express.Router();
const adminOnly = [isAuthenticated, authorizeRoles("admin")];

router.get("/products", products);
router.get("/product/:id", product);
router.post("/search", Search);
router.post("/home/page", pagination);
router.post("/home/filter", filter);
router.post(
  "/add",
  ...adminOnly,
  validateRequired(["proImg", "proName", "proImgPublicId", "proPrice", "proColor"]),
  addProduct
);
router.post("/delete/:id", ...adminOnly, deleteProduct);
router.post(
  "/update/:id",
  ...adminOnly,
  validateRequired(["proName", "proPrice", "proColor"]),
  updateProduct
);
router.post(
  "/upload",
  ...adminOnly,
  uploadProductImage,
  uploadImage
);
router.post(
  "/reveiw/:productId/:userId",
  isAuthenticated,
  validateRequired(["selectedRating", "reviewText", "interestingText"]),
  reviewsubmit
);

export default router;
