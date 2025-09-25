import productmodel from "../models/productsModel.js";
import usermodel from "../models/userModel.js";
import fs from 'fs';
import path from 'path';

export const products = async (req, resp) => {
    try {
        const products = await productmodel.find();
        return resp.json({ success: true, products });
    } catch (error) {
        return resp.json({ success: false, message: error.message });
    }
}

export const addProduct = async (req, resp) => {

    const { proName, proImg, proPrice, proColor } = req.body;

    if (!proImg || !proName || !proPrice || !proColor) {
        return resp.json({ success: false, message: "All fields are required" });
    }
    try {
        const product = new productmodel({
            proImg,
            proName,
            proPrice,
            proColor
        });
        await product.save();
        return resp.json({ success: true, product });
    } catch (error) {
        return resp.json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, resp) => {

    const { id } = req.params;
    try {
        const product = await productmodel.findById(id);
        if (!product) {
            return resp.json({ success: false, message: 'Product not found' });
        }
        let imagePath = null;
        if (product.proImg) {
            if (product.proImg.startsWith('http')) {

                const url = new URL(product.proImg);
                const imageName = path.basename(url.pathname);
                imagePath = path.join(process.cwd(), imageName);
            } else {

                imagePath = path.join(process.cwd(), product.proImg);
            }

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
            }
        }
        const deletedProduct = await productmodel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return resp.json({ success: false, message: 'Product not found' });
        }
        return resp.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        return resp.json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, resp) => {
    const { id } = req.params;
    const { proName, proImg, proPrice, proColor } = req.body;
    if (!proName || !proImg || !proPrice) {
        return resp.json({ success: false, message: "All fields are required" });
    }

    try {
        const existingProduct = await productmodel.findById(id);
        if (!existingProduct) {
            return resp.json({ success: false, message: "Product not found" });
        }

        if (
            existingProduct.proImg &&
            existingProduct.proImg !== proImg &&
            !existingProduct.proImg.startsWith('http')
        ) {
            const oldImageName = path.basename(existingProduct.proImg);
            const oldImagePath = path.join(process.cwd(),'uploads' ,oldImageName);
            console.log(oldImagePath)
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log(`🗑️ Deleted old image: ${oldImagePath}`);
            }
        }

        const updatedProduct = await productmodel.findByIdAndUpdate(
            id,
            {
                proName,
                proImg,
                proPrice,
                proColor
            },
            { new: true }
        );
        if (!updatedProduct) {
            return resp.json({ success: false, message: "Product not found" });
        }
        return resp.json({ success: true, product: updatedProduct });
    } catch (error) {
        return resp.json({ success: false, message: error.message });
    }
};

export const product = async (req, resp) => {
    try {
        const product = await productmodel.findById(req.params.id);
        if (!product) {
            return resp.json({ success: false, message: 'Product not found' });
        }
        resp.json({ success: true, product });
    } catch (error) {
        resp.json({ success: false, message: 'Server error' });
    }
}

export const Search = async (req, resp) => {
    const { Searchvalue } = req.body;
    try {
        const products = await productmodel.find();
        const query = Searchvalue.toLowerCase().trim();
        const filteredProducts = products.filter(product => {
            const nameMatch = product.proName?.toLowerCase().trim().includes(query);
            const priceMatch = product.proPrice?.toString().toLowerCase().trim().includes(query);
            return nameMatch || priceMatch;
        });
        return resp.json({ success: true, products: filteredProducts });
    } catch (error) {
        console.error(error);
        return resp.json({ success: false, message: 'Internal server error' });
    }
}

export const reviewsubmit = async (req, resp) => {
    const { productId, userId } = req.params
    const { selectedRating, reviewText, interestingText } = req.body;
    try {
        const product = await productmodel.findById(productId);
        if (!product) return resp.json({ success: false, message: "Product not found" });
        const user = await usermodel.findById(userId);
        if (!user) return resp.status(404).json({ success: false, message: "User not found" });
        const newReview = {
            userName: user.name,
            selectedRating,
            reviewText,
            interestingText
        };
        product.Reviews.push(newReview);
        await product.save();
        return resp.json({ success: true, message: "Review submitted successfully", product });
    } catch (error) {
        console.error(error);
        return resp.json({ success: false, message: error.message });
    }
}

export const pagination = async (req, resp) => {
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 5;
    const skip = (page - 1) * limit;
    try {
        const products = await productmodel.find().skip(skip).limit(limit);
        const totalProducts = await productmodel.countDocuments();
        return resp.json({
            success: true,
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            products
        });
    } catch (error) {
        return resp.json({ success: false, message: error.message });
    }
};

export const filter = async (req, resp) => {
    try {
        const { colors = [] } = req.body;
        const { minprice, maxprice } = req.body;

        const query = {};

        if (colors.length > 0) {
            query.proColor = { $in: colors };
        }

        if (minprice !== undefined && maxprice !== undefined) {
            query.proPrice = { $gte: minprice, $lte: maxprice };
        } else if (minprice !== undefined) {
            query.proPrice = { $gte: maxprice };
        } else if (maxprice !== undefined) {
            query.proPrice = { $lte: maxprice };
        }
        const filteredProducts = await productmodel.find(query);
        return resp.json({ success: true, products: filteredProducts });
    } catch (error) {
        return resp.json({ success: false, message: error.message });
    }
}


export const uploadImage = (req, resp) => {
    const file = req.body
    if (!file) {
        return resp.json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    resp.json({
        message: "Image uploaded ",
        imageUrl,
    });
};


