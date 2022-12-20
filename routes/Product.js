const router = require('express').Router()
const Product = require('../models/Product')
// const upload = require("../utils/multer");
// const cloudinary = require("../utils/cloudinary");


// POST - create new product
router.post('/products' , async (req , res) => {

    try {
        let product = new Product();
        
        // product.categoryID = req.body.categoryID;
        // product.ownerID = req.body.ownerID;
        product.title = req.body.title;
        product.description = req.body.description;
        product.stockQuantity = req.body.stockQuantity;
        product.photo = req.body.photo;
        product.price = req.body.price;

        await product.save();
        res.json({
            succuss : true,
            msg :'Success Create New Product!'
        })
    } 
    catch (error) {
        res.status(500).json({
            success : true ,
            msg : error.message
        })
    }

})

// Get  - get all products

// POST - get signle product

// PUT - update single product

// DELETE - delete a single request

module.exports = router
