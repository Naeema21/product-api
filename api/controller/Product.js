const mongoose = require('mongoose');
const Product = require('../model/Product');

//get data
const getAllData = async (req, res,) => {
    try {
        const productList = await Product.find().sort({ _id: -1 })
        if (productList.length != 0) {
            res.status(200).json({
                totalproducts: productList.length,
                data: productList
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

//get single product data
const getSingleProduct = async (req, res,) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id)
        if (product.length != 0) {
            res.status(200).json(product);
        } else {
            res.status(203).json({
                message: 'No valid entry found for provided ID'
            });
        }
    } catch (error) {
        res.send('Error => ' + error)
    }
};

const getProductByCategory = async (req, res,) => {
    const name = req.params.category;
    console.log(name)
    try {
        const product = await Product.find(
            { category: { $regex: name, $options: 'i' } }
        )
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
};

const getProductBySUbcategory = async (req, res,) => {
    const name = req.params.subcategory;
    try {
        const product = await Product.find(
            { subCategory: { $regex: name, $options: 'i' } }
        )
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
};
const getProductBySize = async (req, res,) => {
    const name = req.params.size;
    try {
        const product = await Product.find(
            { size: { $regex: name, $options: 'i' } }
        )
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
};

//add product
const addProduct = async (req, res) => {
    const product = Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating,
        image: req.body.image,
        size: req.body.size,
        description: req.body.description,
        testingNote: req.body.testingNote,
        FoodPairing: req.body.FoodPairing,
        ABV: req.body.ABV,
        subCategory: req.body.subCategory
    });
    product.save()
        .then(result => {
            res.status(201).json({
                message: "Thank you for adding data"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
}


//update product
const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            message: "Product Updated Successfull",
            updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

//delete product
const deleteData = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteData = await Product.findByIdAndRemove(id)
        res.status(200).json({
            message: "Record Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


//addreview
const addReview = async (req, res,) => {
    const id = req.params.id;

    const reviews = {
        comment: req.body.comment,
        name: req.body.name,
        email: req.body.email,
        rating: req.body.rating,
        date: new Date().toDateString(),
    };

    Product.findById(id, (err, data) => {
        if (err || !data || !req.body) {
            return res.json(`Comment fail. ${id} product doesn't exist.`);
        } else {
            //add to comments array of the comment object
            data.review.push(reviews);

            //   save changes to db
            data.save((err) => {
                if (err) {
                    return res.json("Something's wrong. Please contact admin.");
                }
                return res.json({
                    "Message": "Thank You!",
                    "comment": reviews
                });
            });
        }
    });
};
module.exports =
{
    getAllData,
    addProduct,
    deleteData,
    getSingleProduct,
    updateProduct,
    getProductByCategory,
    getProductBySUbcategory,
    getProductBySize,
    addReview
}