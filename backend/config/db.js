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
    // If already connected and connection is ready, return
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log('Using existing database connection');
        return true;
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
        
        // Disconnect if there's a stale connection
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        
        // Connect with optimized settings for Vercel
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Increased timeout
            socketTimeoutMS: 45000,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 1, // Maintain at least 1 socket connection
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
        })
        
        isConnected = true;
        console.log("Successfully connected to MongoDB")
        
        // Handle connection events
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });
        
        mongoose.connection.on('error', (error) => {
            console.log('MongoDB connection error:', error);
            isConnected = false;
        });
        
        return true
    } catch (error) {
        console.log("MongoDB connect error:", error.message)
        isConnected = false;
        throw error
    }
}

export default connectDB