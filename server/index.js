import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import { corsOptions } from "./config/cors.js";
import { env } from "./config/env.js";
import router from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("server is running"));
app.get("/test", (req, res) => res.send("Server is working"));

app.use(router);
app.use(notFound);
app.use(errorHandler);

connectDb()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`server is running on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error("server startup failed", error.message);
    process.exit(1);
  });
