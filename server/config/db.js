import mongoose from "mongoose";
import { env } from "./env.js";

const connectDb = async () => {
  if (!env.mongoUrl) {
    throw new Error("MONGO_URL is required");
  }

  mongoose.connection.on("connected", () => {
    console.log("database connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("database connection error", error.message);
  });

  await mongoose.connect(env.mongoUrl);
};

export default connectDb;
