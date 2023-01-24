const router = require("express").Router();
const Order = require("../models/Order");
const verifyToken = require("../middlewares/verify-token");

router.get("/orders", verifyToken, async (req, res) => {
  try {
    let products = await Order.find({owner : req.decoded._id})
            .populate("owner products.productID");
    res.json({
        success : true ,
        products : products
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      msg: error.message,
    });
  }
});
module.exports = router;
