import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, deleteProductDetails, getProductController, getProductDetails, searchProduct, updateProductDetails, addReviewController } from '../controllers/product.controller.js'

const productRouter = Router()

// Public read endpoints
productRouter.post('/get',getProductController)
productRouter.post('/get-product-details',getProductDetails)

// Write endpoints require authentication
productRouter.post("/create",auth,createProductController)
productRouter.put('/update-product-details',auth,updateProductDetails)
productRouter.delete('/delete-product',auth,deleteProductDetails)

//search product 
productRouter.post('/search-product',searchProduct)

// add review to product
productRouter.post('/:id/review',addReviewController)

export default productRouter