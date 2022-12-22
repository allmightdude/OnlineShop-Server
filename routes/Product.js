const router = require("express").Router();
const Product = require("../models/Product");

// POST - create new product
router.post("/products", async (req, res) => {
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
      succuss: true,
      msg: "Success Create New Product!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// Get  - get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find().exec();
    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// POST - get signle product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findById({
      _id: req.params.id,
    });

    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      msg: error.message,
    });
  }
});

// PUT - update single product
router.put("/products/:id", async (req, res) => {
  try {
    console.log(req.body);
    let updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
        //   categoryID: req.body.categoryID,
          ownerID: req.body.ownerID,
          title: req.body.title,
          price: req.body.price,
          stockQuantity: req.body.stockQuantity,
          description: req.body.description,
          photo: "new Pic Url",
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      msg: error.message,
    });
  }
});
// DELETE - delete a single request

module.exports = router;
