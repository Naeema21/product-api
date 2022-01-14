const mongoose = require('mongoose');
const Cart = require('../model/Cart')


//get all data
const getData = async (req, res) => {
    try {
        const cart = await Cart.find({ "user": req.params.userId }).populate("product", "name category price size image rating testingNote FoodPairing  ABV subCategory").sort({ _id: -1 })
        if (cart.length != 0) {
            res.status(200).json({
                totalcart: cart.length,
                data: cart
            });

        } else {
            res.status(204).json({
                message: 'No entries found in table'
            });
        }
    } catch (error) {
        res.send('Error => ' + error)

    }
}

//add data 
const addCart = async (req, res) => {
    const cartProduct = await Cart.find({ "product": req.body.productId, "user": req.body.userId })
    const cart = Cart({
        product: req.body.productId,
        user: req.body.userId,
        quantity: req.body.quantity
    })
    try {
        if (cartProduct.length > 0) {
            res.status(201).json({
                message: "Data already at cart"
            });
        } else {
            cart.save().then(result => {
                res.status(201).json({
                    message: "Data added to cart"
                });
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    };
}


//delete cart 
const deletecart = async (req, res) => {
    const id = req.params.id
    try {
        const deletedData = await Cart.findByIdAndRemove(id)
        if(deletedData){
            res.status(200).json({
                message: "Record Deleted Successfully",
            })
        }else{
            res.status(204).json({
                message: "Cart data Not found",
            })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getData, addCart, deletecart }