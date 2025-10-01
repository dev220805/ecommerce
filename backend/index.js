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
    origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())


const PORT = process.env.PORT || 8080 

app.get("/",(request,response)=>{
    response.json({
        message : "Server is running " + PORT
    })
})

// API routes
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/upload', uploadRouter)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})
