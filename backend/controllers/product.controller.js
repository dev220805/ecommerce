import ProductModel from "../models/product.model.js";

export const createProductController = async(request,response)=>{
    try {
        console.log('Received request body:', request.body);
        const { 
            name,
            description,
            price,
            category,
            stock,
            images
        } = request.body 

        if(!name || !description || !price || !category || !stock || !images){
            console.log('Missing fields:', {
                name: !!name,
                description: !!description,
                price: !!price,
                category: !!category,
                stock: !!stock,
                images: !!images
            });
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        // Validate that images array has at least one valid URL
        if(!Array.isArray(images) || images.length === 0 || !images[0]?.url){
            return response.status(400).json({
                message : "Please provide at least one image URL",
                error : true,
                success : false
            })
        }

        const product = new ProductModel({
            name,
            image: images,
            category,
            stock,
            price,
            description,
        })
        const saveProduct = await product.save()

        return response.json({
            message : "Product Created Successfully",
            data : saveProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductController = async(request,response)=>{
    try {
        
        let { page, limit, search } = request.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductDetails = async(request,response)=>{
    try {
        const { productId } = request.body 

        const product = await ProductModel.findOne({ _id : productId })


        return response.json({
            message : "product details",
            data : product,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update product
export const updateProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide product _id",
                error : true,
                success : false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id : _id },{
            ...request.body
        })

        return response.json({
            message : "updated successfully",
            data : updateProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//delete product
export const deleteProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id })

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//search product
export const searchProduct = async(request,response)=>{
    try {
        let { search, page , limit } = request.body 

        if(!page){
            page = 1
        }
        if(!limit){
            limit  = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = ( page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt  : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            data : data,
            totalCount :dataCount,
            totalPage : Math.ceil(dataCount/limit),
            page : page,
            limit : limit 
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//add review to product
export const addReviewController = async(request,response)=>{
    try {
        const { id } = request.params
        const { reviewerName, rating, comment } = request.body

        if(!reviewerName || !rating || !comment){
            return response.status(400).json({
                message : "Please provide reviewer name, rating, and comment",
                error : true,
                success : false
            })
        }

        if(rating < 1 || rating > 5){
            return response.status(400).json({
                message : "Rating must be between 1 and 5",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.findById(id)
        if(!product){
            return response.status(404).json({
                message : "Product not found",
                error : true,
                success : false
            })
        }

        // Add review to product
        product.reviews.push({
            reviewerName,
            rating,
            comment
        })

        // Update ratings and numReviews
        const totalReviews = product.reviews.length
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0)
        product.ratings = totalRating / totalReviews
        product.numReviews = totalReviews

        await product.save()

        return response.json({
            message : "Review added successfully",
            error : false,
            success : true,
            data : product
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}