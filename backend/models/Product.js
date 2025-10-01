const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing whitespace
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensure price is non-negative
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Ensure stock is non-negative
    },
    images: [
        {
            url: {
                type: String,
                required: true,
            },
        },
    ],
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5, // Ratings range from 0 to 5
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
    reviews: [
        {
            reviewerName: {
                type: String,
                required: true, // Name of the reviewer
            },
            rating: {
                type: Number,
                required: true,
                min: 0,
                max: 5, // Rating should be between 0 and 5
            },
            comment: {
                type: String,
                required: true, // Review comment
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now, // Automatically set the date of the review
            },
        },
    ],
}, { // Add the text index here
    text: { name: "text", description: "text" }
});

module.exports = mongoose.model('Product', productSchema);