import usermodel from "../models/userModel.js";
import connectdb from "../database/dbConection.js";


async function createAdmin() {
    connectdb();
  try {
    const adminExists = await usermodel.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const newAdmin = new usermodel({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@123',  
        role: 'admin'
      });
      await newAdmin.save();
    } else {
    }
  } catch (err) {
  }
}

createAdmin();


