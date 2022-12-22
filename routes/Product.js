const router = require('express').Router()
const Product = require('../models/Product')



// POST - create new product
router.post('/products', async (req , res) => {

    try {
        let product = new Product();
        
        // product.categoryID = req.body.categoryID;
        // product.ownerID = req.body.ownerID;
        product.title = req.body.title;
        product.description = req.body.description;
        product.stockQuantity = req.body.stockQuantity;
        product.photo = `result.secure_url`;
        product.price = req.body.price;

        await product.save();
        res.json({
            succuss : true,
            msg :'Success Create New Product!'
        })
    } 
    catch (error) {
        res.status(500).json({
            success : false ,
            msg : error.message
        })
    }

})

// Get  - get all products
router.get('/products' , async (req , res)=>{
    try {
        let products = await Product.find()
        .exec();
        res.json({
            success : true,
            products : products
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            msg : error.message
        })
    }
})



// POST - get signle product

// PUT - update single product

// DELETE - delete a single request

module.exports = router
