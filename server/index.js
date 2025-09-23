import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConection from './database/dbConection.js'
import router from "./router/useRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
const allowedOrigins = ['http://localhost:5173']

app.use(cors({origin:allowedOrigins, credentials: true }))
   
const port = process.env.poort || 4000;
dbConection();

app.get("/", (req, resp) => {
    resp.send("server is running")
})
app.listen(port)
app.use(router)