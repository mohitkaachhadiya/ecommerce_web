import mongoose from "mongoose";


const userCart = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', 
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
});




const userschema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    cart: [userCart]


})

const usermodel = mongoose.model('users', userschema)
export default usermodel;