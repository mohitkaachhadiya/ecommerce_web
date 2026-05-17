import {
  addProductReview,
  createProduct,
  deleteProductById,
  filterProducts,
  getPaginatedProducts,
  getProductById,
  getProducts,
  searchProducts,
  updateProductById,
} from "../services/productService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const products = asyncHandler(async (req, res) => {
  const products = await getProducts();
  return sendSuccess(res, { products });
});

export const addProduct = asyncHandler(async (req, res) => {
  const product = await createProduct(req.body);
  return sendSuccess(res, { message: "Product added successfully", product }, 201);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await deleteProductById(req.params.id);
  return sendSuccess(res, { message: "Product deleted successfully" });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await updateProductById(req.params.id, req.body);
  return sendSuccess(res, { message: "Product updated successfully", product });
});

export const product = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id);
  return sendSuccess(res, { product });
});

export const Search = asyncHandler(async (req, res) => {
  const products = await searchProducts(req.body.Searchvalue);
  return sendSuccess(res, { products });
});

export const reviewsubmit = asyncHandler(async (req, res) => {
  const product = await addProductReview(
    req.params.productId,
    req.params.userId,
    req.body
  );

  return sendSuccess(res, {
    message: "Review submitted successfully",
    product,
  });
});

export const pagination = asyncHandler(async (req, res) => {
  const payload = await getPaginatedProducts(req.body);
  return sendSuccess(res, payload);
});

export const filter = asyncHandler(async (req, res) => {
  const products = await filterProducts(req.body);
  return sendSuccess(res, { products });
});

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  return sendSuccess(res, {
    message: "Image uploaded successfully",
    imageUrl: req.file.path,
    publicId: `${req.file.filename}`,
  });
});
