import { ApiError } from "../utils/apiError.js";

export const validateRequired =
  (fields, source = "body") =>
  (req, res, next) => {
    const missingFields = fields.filter((field) => {
      const value = req[source]?.[field];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length) {
      return next(
        new ApiError(400, `Missing required fields: ${missingFields.join(", ")}`)
      );
    }

    next();
  };
