import express from "express";
import { addToCart, decQty, deleteCart, getCart, incQty, login, logout, register } from "../controler/userControler.js";
import { addProduct, deleteProduct, filter, pagination, product, products, reviewsubmit, Search, updateProduct, uploadImage } from "../controler/productControler.js";
import upload from "../controler/cloudinary.js";



const router = express.Router();
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/products', products)
router.post('/add', addProduct)
router.post('/home/addtocart/:userId', addToCart)
router.get('/home/getcart/:userId', getCart)
router.post('/home/deletecartitem/:userId', deleteCart)
router.post('/incQty/:userId', incQty)
router.post('/decQty/:userId', decQty)
router.post('/delete/:id', deleteProduct)
router.post('/update/:id', upload.single('image'), updateProduct);
router.get('/product/:id', product)
router.post('/search', Search)
router.post('/reveiw/:productId/:userId', reviewsubmit);
router.post('/home/page', pagination);
router.post('/home/filter', filter);
router.post('/upload', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({ success: false, message: "Multer error", error: err.message });
        }
        next();
    });
}, uploadImage);

console.log(upload.single('image'))

export default router;