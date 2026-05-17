import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productsModel.js";
import userModel from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import {
  normalizeProductImage,
  normalizeProductImages,
} from "../utils/productImage.js";

export const getProducts = async () => {
  const products = await productModel.find();
  return normalizeProductImages(products);
};

export const createProduct = async (payload) => {
  const product = await productModel.create(payload);
  return normalizeProductImage(product);
};

export const getProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) throw new ApiError(404, "Product not found");
  return normalizeProductImage(product);
};

export const updateProductById = async (id, payload) => {
  const product = await productModel.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  if (payload.proImgPublicId && payload.proImgPublicId !== product.proImgPublicId) {
    if (product.proImgPublicId) {
      await cloudinary.uploader.destroy(product.proImgPublicId);
    }
    product.proImgPublicId = payload.proImgPublicId;
    product.proImg = payload.proImg;
  }

  product.proName = payload.proName;
  product.proPrice = payload.proPrice;
  product.proColor = payload.proColor;
  await product.save();

  return normalizeProductImage(product);
};

export const deleteProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  if (product.proImgPublicId) {
    await cloudinary.uploader.destroy(product.proImgPublicId);
  }

  await productModel.findByIdAndDelete(id);
};

export const searchProducts = async (searchValue = "") => {
  const query = searchValue.toLowerCase().trim();
  if (!query) return [];

  const products = await productModel.find({
    $or: [
      { proName: { $regex: query, $options: "i" } },
      { proColor: { $regex: query, $options: "i" } },
    ],
  });

  const priceMatches = await productModel.find({
    $expr: {
      $regexMatch: {
        input: { $toString: "$proPrice" },
        regex: query,
        options: "i",
      },
    },
  });

  const productMap = new Map(
    [...products, ...priceMatches].map((product) => [product._id.toString(), product])
  );

  return normalizeProductImages([...productMap.values()]);
};

export const addProductReview = async (
  productId,
  userId,
  { selectedRating, reviewText, interestingText }
) => {
  const product = await productModel.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const user = await userModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  product.Reviews.push({
    userName: user.name,
    selectedRating,
    reviewText,
    interestingText,
  });

  await product.save();
  return normalizeProductImage(product);
};

export const getPaginatedProducts = async ({ page = 1, limit = 8 }) => {
  const normalizedPage = Math.max(Number(page) || 1, 1);
  const normalizedLimit = Math.max(Number(limit) || 8, 1);
  const skip = (normalizedPage - 1) * normalizedLimit;

  const [products, totalProducts] = await Promise.all([
    productModel.find().skip(skip).limit(normalizedLimit),
    productModel.countDocuments(),
  ]);

  return {
    page: normalizedPage,
    limit: normalizedLimit,
    totalProducts,
    totalPages: Math.ceil(totalProducts / normalizedLimit),
    products: normalizeProductImages(products),
  };
};

export const filterProducts = async ({ colors = [], minprice, maxprice }) => {
  const query = {};
  const priceQuery = {};

  if (Array.isArray(colors) && colors.length > 0) {
    query.proColor = { $in: colors };
  }

  if (minprice !== undefined && minprice !== "") {
    priceQuery.$gte = Number(minprice);
  }

  if (maxprice !== undefined && maxprice !== "") {
    priceQuery.$lte = Number(maxprice);
  }

  if (Object.keys(priceQuery).length) {
    query.proPrice = priceQuery;
  }

  const products = await productModel.find(query);
  return normalizeProductImages(products);
};
