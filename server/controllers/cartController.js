import {
  addCartItem,
  deleteCartItem,
  getUserCart,
  updateCartItemQuantity,
} from "../services/cartService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";

export const addToCart = asyncHandler(async (req, res) => {
  const cart = await addCartItem(req.params.userId, req.body);
  return sendSuccess(res, { message: "Cart updated", cart });
});

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getUserCart(req.params.userId);
  return sendSuccess(res, { cart });
});

export const deleteCart = asyncHandler(async (req, res) => {
  const cart = await deleteCartItem(req.params.userId, req.body.cartItemId);
  return sendSuccess(res, { message: "Cart item removed", cart });
});

export const incQty = asyncHandler(async (req, res) => {
  const cart = await updateCartItemQuantity(req.params.userId, req.body.cartItemId, 1);
  return sendSuccess(res, { message: "Quantity updated", cart });
});

export const decQty = asyncHandler(async (req, res) => {
  const cart = await updateCartItemQuantity(req.params.userId, req.body.cartItemId, -1);
  return sendSuccess(res, { message: "Quantity updated", cart });
});
