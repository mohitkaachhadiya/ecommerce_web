import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConection from './database/dbConection.js'
import router from "./router/useRouter.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

const app = express();
app.use(express.json());
app.use(cookieParser())
const allowedOrigins = "https://ecommerce-web-e9sm.onrender.com"

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const port = process.env.port || 4000;
dbConection();

app.get("/", (req, resp) => {
    resp.send("server is running")
})


app.use(router)
app.listen(port)
