import mongoose from "mongoose";
import colors from "colors";

const connectDb= async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        })

        console.log(`MongoDB connected ${con.connection.host}`.cyan.underline);
        
    } catch (error) {
        console.error(`Error is ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDb