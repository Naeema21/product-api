const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    quantity:{
        type:Number,
        required:'Please Enter quantity'
    },
  
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema)