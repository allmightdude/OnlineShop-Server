const router = require("express").Router();
const Product = require("../models/Product");
const upload = require("../middlewares/multer");
const cloudinary = require("../utils/cloudinary");

// POST - create new product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    let product = new Product();
    product.categoryID = req.body.categoryID;
    product.ownerID = req.body.ownerID;
    product.title = req.body.title;
    product.description = req.body.description;
    product.stockQuantity = req.body.stockQuantity;
    product.price = req.body.price;
    product.photo = result.secure_url;

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
router.put('/products/:id' , upload.single('photo') , async(req , res)=>{
  try {

      let preUpdate = await Product.findById({
          _id : req.params.id
      })
      let newPhoto = preUpdate.photo;
      if(req.file){
          const result = await cloudinary.uploader.upload(req.file.path);
          if(result){
              res.json({
                  result
              })
          }
          newPhoto = result.secure_url;
      }

      let Updatedproduct = await Product.findOneAndUpdate({_id : req.params.id} , {
          $set : {
              categoryID : req.body.categoryID,
              ownerID : req.body.ownerID,
              title : req.body.title,
              price : req.body.price,
              stockQuantity : req.body.stockQuantity,
              description : req.body.description,
              photo : newPhoto
          }
      } , {upsert : true});

      res.json({
          success : true,
          Updatedproduct : Updatedproduct
      })
  } catch (error) {
      res.status(500).json({
          success : true ,
          msg : error.message
      })
  }
})

// DELETE - delete a single request
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedProduct) {
      res.json({
        success: true,
        msg: "successfully deleted product!",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
});
module.exports = router;
