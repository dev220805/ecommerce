import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

// Track connection state
let isConnected = false;

async function connectDB(){
    // If already connected, return
    if (isConnected) {
        console.log('Using existing database connection');
        return true;
    }

    try {
        // Add connection options for better reliability
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            // Remove the problematic buffer settings for serverless
            // bufferMaxEntries: 0,
            // bufferCommands: false,
        })
        
        isConnected = true;
        console.log("Connected to MongoDB")
        
        // Handle connection events
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });
        
        return true
    } catch (error) {
        console.log("MongoDB connect error:", error)
        isConnected = false;
        throw error
    }
}

export default connectDB