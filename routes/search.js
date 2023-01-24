const Product = require("../models/Product");

const router = require("express").Router();

router.get("/search", async (req, res) => {
  try {
    const filters = req.query;
    const Products = await Product.find();

    const filterdProducts = Products.filter((prd) => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && prd[key] === filters[key];
      }
      return isValid;
    });
    res.json({
      filterdProducts: filterdProducts,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
