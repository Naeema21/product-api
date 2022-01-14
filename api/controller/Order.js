
const mongoose = require('mongoose');
const Order = require('../model/Order')

const getData = async (req, res) => {
    try {
        const order = await Order.find({ "user": req.params.userId }).populate("product").sort({ _id: -1 })
        if (order.length != 0) {
            res.status(200).json({
                totalorder: order.length,
                data: order
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

const addorder = async (req, res) => {
    const orderProduct = await Order.find({ "product": req.body.productId, "user": req.body.userId })
    const order = Order({
        product: req.body.productId,
        user: req.body.userId,
        price:req.body.price,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        country:req.body.country,
        city:req.body.city,
        zip:req.body.zip,
        address:req.body.address,
        shippingMethod:req.body.shippingMethod
    })
    try {
        if (orderProduct.length > 0) {
            res.status(201).json({
                message: "Data already at order"
            });
        } else {
            order.save().then(result => {
                res.status(201).json({
                    message: "Data added to order"
                });
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    };
}

module.exports = { getData , addorder}