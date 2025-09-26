import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.YOUR_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.YOUR_API_KEY || process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.YOUR_API_SECRET || process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'upload',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});
console.log("1-----------");

const upload = multer({ storage });
export default upload;
