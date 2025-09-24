import mongoose from "mongoose";

const connectdb = async () => {

    mongoose.connection.on('connected', () => {
        console.log("databse connected")
    })
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
export default connectdb;