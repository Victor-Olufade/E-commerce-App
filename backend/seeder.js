import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from './data/users.js'
import products from "./data/products.js";
import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'
import connectDb from "./config/db.js";

dotenv.config()

connectDb()

const importData = async() =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers.find(user=> user.name === "Admin User")
        const adminUserId = adminUser._id

        const sampleProducts = products.map(product => {
            return {...product, user: adminUserId}
        })

        await Product.insertMany(sampleProducts)
        console.log("Data imported");
        process.exit()
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1)
    }
}

const destroyData = async() =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log("Data destroyed");
        process.exit()
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1)
    }
}


if(process.argv[2] === "-d"){
    destroyData()
}else{
    importData()
}