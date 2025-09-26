import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConection from './database/dbConection.js'
import router from "./router/useRouter.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(cookieParser())
const allowedOrigins = [
    "https://ecommerce-web-e9sm.onrender.com", // backend itself (if you test APIs directly)
    "https://ecommerce-web-15lx-git-main-mohits-projects-591f65b7.vercel.app", // frontend on vercel
    "http://localhost:5173"
];

app.use(cors({ origin: allowedOrigins, credentials: true }))

app.get("/test", (req, res) => res.send("Server is working"));


const port = process.env.PORT;
console.log(process.env.PORT)
dbConection();

app.get("/", (req, resp) => {
    resp.send("server is running")
})

app.use(router)
app.listen(port)
