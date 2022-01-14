const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },  
    price: {
        type: String,
        required: 'Please Enter Price'
    },
    name: {
        type: String,
        required: 'Please Enter Name'
    },
    email: {
        type: String,
        required: 'Please Enter Email'
    },
    phone: {
        type: Number,
        required: 'Please Enter Number'
    },
    country: {
        type: String,
        required: 'Please Enter Country'
    },
    city: {
        type: String,
        required: 'Please Enter Name'
    },
    zip: {
        type: String,
        required: 'Please Enter Zip'
    },
    address: {
        type: String,
        required: 'Please Enter Address'
    },
    shippingMethod: {
        type: String,
        required: 'Please Enter Shipping method'
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema)