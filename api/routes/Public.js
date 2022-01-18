const express = require("express");
const router = express.Router();

const ProductController = require('../controller/Product')
const WishlistController = require('../controller/Wishlist');
const CartController = require('../controller/Cart')
const CompareController =require('../controller/Compare')
const OrderController =require('../controller/Order')

//product routes
router.get('/product' , ProductController.getAllData);
router.post('/product' , ProductController.addProduct);
router.get('/product/category/:category' , ProductController.getProductByCategory)
router.get('/product/subcategory/:subcategory' , ProductController.getProductBySUbcategory)
router.get('/product/size/:size' , ProductController.getProductBySize)
router.post('/product/review/:id' , ProductController.addReview)

router.get('/product/:id' , ProductController.getSingleProduct);
router.post('/product/:id' , ProductController.updateProduct);
// router.delete('/product/:id' , ProductController.deleteData)

//wishlist routes 
router.get('/wishlist/:userId' ,WishlistController.getAllData )
router.post('/wishlist' ,WishlistController.addWishlist )
router.delete('/wishlist/:id' , WishlistController.deleteData)

//cart routes
router.get('/cart/:userId' ,CartController.getData)
router.post('/cart' , CartController.addCart)
router.delete('/cart/:id' , CartController.deletecart)

//compare routes
router.get('/compare/:userId', CompareController.getAllData );
router.post('/compare', CompareController.addCompare );
router.delete('/compare/:id', CompareController.deleteData );

//order routes
router.get('/order/:userId' ,  OrderController.getData)
router.post('/order' , OrderController.addorder)


module.exports = router;
