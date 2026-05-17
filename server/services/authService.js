import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { env, isProduction } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

const tokenMaxAge = 7 * 24 * 60 * 60 * 1000;

export const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: tokenMaxAge,
};

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
    expiresIn: "7d",
  });

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await userModel.create({ name, email, password });
  const token = createToken(user);

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await userModel.findOne({ email });

  if (!user || user.password !== password) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = createToken(user);
  return { user, token };
};

export const sanitizeUser = (user) => {
  const safeUser = typeof user.toObject === "function" ? user.toObject() : { ...user };
  delete safeUser.password;
  return safeUser;
};
