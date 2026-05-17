import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import {
  cookieOptions,
  loginUser,
  registerUser,
  sanitizeUser,
} from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const { token } = await registerUser(req.body);
  res.cookie("token", token, cookieOptions);

  return sendSuccess(res, { message: "Registered successfully" }, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await loginUser(req.body);
  res.cookie("token", token, cookieOptions);

  return sendSuccess(res, {
    message: "Login successful",
    user: sanitizeUser(user),
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions);
  return sendSuccess(res, { message: "Logged out" });
});
