import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/apiError.js";

export const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ApiError(401, "Not authorized, login again"));
  }

  try {
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch (error) {
    next(new ApiError(401, "Session expired, login again"));
  }
};

export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(new ApiError(403, "You do not have permission"));
    }

    next();
  };
