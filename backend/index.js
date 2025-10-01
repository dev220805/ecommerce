import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import uploadRouter from './routes/upload.route.js'


const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}))
app.use(express.json())
app.use(cookieParser())


const PORT = process.env.PORT || 8080 

app.get("/",(request,response)=>{
    response.json({
        message : "Server is running " + PORT,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
})

// Health check endpoint
app.get("/health",(request,response)=>{
    response.json({
        status: "OK",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
})

// API routes
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/upload', uploadRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: true,
        success: false
    });
});

// For Vercel serverless functions
if (process.env.NODE_ENV === 'production') {
    // In production (Vercel), don't start a server
    // Just connect to DB and export the app
    connectDB().catch(error => {
        console.error('Database connection failed:', error);
    });
} else {
    // In development, start the server
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log("Server is running", PORT)
        })
    }).catch(error => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });
}

export default app;
