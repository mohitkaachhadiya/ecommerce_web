import { env } from "../config/env.js";

export const normalizeProductImage = (product) => {
  if (!product) return product;

  const normalizedProduct =
    typeof product.toObject === "function" ? product.toObject() : { ...product };
  const imagePath = normalizedProduct.proImg;

  if (
    env.cloudinary.cloudName &&
    typeof imagePath === "string" &&
    imagePath.startsWith("/uploads/")
  ) {
    const fileName = imagePath.split("/").pop();
    normalizedProduct.proImg = `https://res.cloudinary.com/${env.cloudinary.cloudName}/image/upload/upload/${fileName}`;
  }

  return normalizedProduct;
};

export const normalizeProductImages = (products) =>
  products.map(normalizeProductImage);
