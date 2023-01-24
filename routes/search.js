const Product = require("../models/Product");

const router = require("express").Router();

router.get("/search", async (req, res) => {
  try {
    const filters = req.query;
    const Products = await Product.find();
    console.log(req.query);
    const filterdProducts = Products.filter((prd) => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && prd[key] == filters[key];
      }
      return isValid;
    });
    res.json({
      success: true,
      filterdProducts: filterdProducts,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
