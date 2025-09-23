import usermodel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, resp) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return resp.json({ success: false, message: 'missing details' })
    }
    try {
        const exsitinguser = await usermodel.findOne({ email })
        if (exsitinguser) {
            return resp.json({ success: false, message: 'user alredy exists' })
        }
        const user = new usermodel({ name, email, password })
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.key, { expiresIn: "7d" });
        resp.cookie("token", token, {
            httpOnly: true,
            secure: 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return resp.json({ success: true, message: 'Registered successfully' });
    } catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

export const login = async (req, resp) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return resp.json({ success: false, message: 'missing details' })
    }
    try {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return resp.json({ success: false, message: 'invalid email' })
        }
        if (password !== user.password) {
            return resp.json({ success: false, message: 'invalid password' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.key, { expiresIn: "7d" });
        resp.cookie("token", token)
        return resp.json({
            success: true, user
        })
    } catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

export const logout = async (req, resp) => {

    try {
        resp.clearCookie("token")
        return resp.json({ success: true, message: 'logged out' })
    } catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

export const addToCart = async (req, resp) => {
    try {
        const { userId } = req.params
        const { productId } = req.body;
        const quantity = req.body.quantity ? req.body.quantity : 1;
        const user = await usermodel.findById(userId);
        if (!user) return resp.json({ message: "User not found" });
        const existingItem = user.cart.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += Number(quantity);
        } else {
            user.cart.push({ product: productId, quantity });
        }
        await user.save();
        resp.json({ success: true, cart: user.cart });
    } catch (error) {
        resp.json({ message: "Error updating cart", error });
    }
}

export const getCart = async (req, resp) => {
    try {
        const { userId } = req.params;
        const user = await usermodel.findById(userId).populate('cart.product');
        if (!user) {
            return resp.json({ success: false, message: "User not found" });
        }
        return resp.json({ success: true, cart: user.cart });
    } catch (error) {
        resp.json({ success: false, message: "Error fetching cart", error });
    }
}

export const deleteCart = async (req, resp) => {

    try {
        const { userId } = req.params;
        const { cartItemId } = req.body
        const user = await usermodel.findById(userId);
        if (!user) return resp.json({ success: false, message: "User not found" });

        const initialLength = user.cart.length;
        user.cart = user.cart.filter(item => {
            return !item._id.equals(cartItemId)
        });
        if (user.cart.length === initialLength) {

            return resp.json({ success: false, message: "Product not found in cart" });
        }
        await user.save();
        return resp.json({ success: true, cart: user.cart });
    } catch (error) {
        return resp.json({ success: false, error: error.message });
    }
}

export const incQty = async (req, resp) => {
    try {
        const { userId } = req.params;
        const { cartItemId } = req.body
        const quantity = 1

        const user = await usermodel.findById(userId);
        if (!user) return resp.json({ success: false, message: "User not found" });

        const cartItem = user.cart.id(cartItemId);
        if (!cartItem) return resp.json({ success: false, message: "Cart item not found" });
        cartItem.quantity += Number(quantity);
        await user.save();
        return resp.json({ success: true, cart: user.cart });

    } catch (error) {
        resp.json({ message: "Error updating cart", error });
    }
}

export const decQty = async (req, resp) => {
    try {
        const { userId } = req.params;
        const { cartItemId } = req.body
        const quantity = 1

        const user = await usermodel.findById(userId).populate('cart.product');
        if (!user) return resp.json({ success: false, message: "User not found" });

        const cartItem = user.cart.id(cartItemId);
        if (!cartItem) return resp.json({ success: false, message: "Cart item not found" });
        cartItem.quantity -= Number(quantity);
        await user.save();
        return resp.json({ success: true, cart: user.cart });

    } catch (error) {
        resp.json({ message: "Error updating cart", error });
    }
}

