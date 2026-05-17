import { upload } from "../config/cloudinary.js";

export const uploadProductImage = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: "Image upload failed", error: error.message });
    }

    next();
  });
};
