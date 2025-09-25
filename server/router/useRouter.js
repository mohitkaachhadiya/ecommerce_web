import express from "express";
import { addToCart, decQty, deleteCart, getCart, incQty, login, logout, register } from "../controler/userControler.js";
import { addProduct, deleteProduct, filter, pagination, product, products, reviewsubmit, Search, updateProduct, uploadImage } from "../controler/productControler.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


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
router.post('/update/:id', updateProduct)
router.get('/product/:id', product)
router.post('/search', Search)
router.post('/reveiw/:productId/:userId', reviewsubmit);
router.post('/home/page', pagination);
router.post('/home/filter', filter);
router.post('/upload', upload.single('image'), uploadImage);


export default router;