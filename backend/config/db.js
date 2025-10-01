import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
        return true
    } catch (error) {
        console.log("Mongodb connect error",error)
        // Don't use process.exit(1) in serverless functions
        throw error
    }
}

export default connectDB