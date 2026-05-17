import userModel from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import { normalizeProductImage } from "../utils/productImage.js";

export const addCartItem = async (userId, { productId, quantity = 1 }) => {
  const user = await userModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  return user.cart;
};

export const getUserCart = async (userId) => {
  const user = await userModel.findById(userId).populate("cart.product");
  if (!user) throw new ApiError(404, "User not found");

  return user.cart.map((item) => {
    const cartItem = item.toObject();
    cartItem.product = normalizeProductImage(cartItem.product);
    return cartItem;
  });
};

export const deleteCartItem = async (userId, cartItemId) => {
  const user = await userModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const initialLength = user.cart.length;
  user.cart = user.cart.filter((item) => !item._id.equals(cartItemId));

  if (user.cart.length === initialLength) {
    throw new ApiError(404, "Product not found in cart");
  }

  await user.save();
  return user.cart;
};

export const updateCartItemQuantity = async (userId, cartItemId, delta) => {
  const user = await userModel.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const cartItem = user.cart.id(cartItemId);
  if (!cartItem) throw new ApiError(404, "Cart item not found");

  cartItem.quantity = Math.max(1, cartItem.quantity + delta);
  await user.save();

  return user.cart;
};
