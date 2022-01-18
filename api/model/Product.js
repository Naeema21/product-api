const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Please Enter Name'
    },
    category: {
        type: String,
        required: 'Please Enter Category'
    },
    price: {
        type: Number,
        required: 'Please Enter Price'
    },
    size: {
        type: String,
        required: 'Please Enter Size'
    },
    rating: {
        type: Number,
        required: 'Please Enter ratings'
    },
    image: {
        type: String,
        required: 'Please Select Image'
    },
    description: {
        type: String,
        required: 'Please Select description'
    },
    tesetingNote: {
        type: String
    },
    FoodPairing: {
        type: String
    },
    ABV: {
        type: String
    },
    subCategory: {
        type: String
    },
    review: [{
        comment: String,
        email: String,
        name: String,
        rating: Number,
        date: { type: String, default: new Date().toDateString() }
    }],


}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema)