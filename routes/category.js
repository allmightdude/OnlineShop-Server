const router = require("express").Router();
const Category = require("../models/Category");

// create a category
router.post("/category", async (req, res) => {
  try {
    let category = new Category();
    category.title = req.body.title;
    await category.save();

    res.send({
      success: true,
      msg: "category created!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
})

module.exports = router;