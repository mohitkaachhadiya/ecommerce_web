import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET || process.env.key,
  clientOrigins: (
    process.env.CLIENT_ORIGINS ||
    "http://localhost:5173,https://ecommerce-web-15lx-git-main-mohits-projects-591f65b7.vercel.app,https://ecommerce-web-e9sm.onrender.com"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || process.env.YOUR_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY || process.env.YOUR_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET || process.env.YOUR_API_SECRET,
  },
};

export const isProduction = env.nodeEnv === "production";
