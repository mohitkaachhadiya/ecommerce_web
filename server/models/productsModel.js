import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    selectedRating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    interestingText: { type: String ,required: true},
});

const productschema = new mongoose.Schema({
    proImg: { type: String, required: true },
    proName: { type: String, required: true },
    proPrice: { type: Number, required: true },
    proColor:{type: String,required: true},
    Reviews: [reviewSchema]
});





const productmodel = mongoose.model('products', productschema)
export default productmodel;