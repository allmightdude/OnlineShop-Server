const router = require("express").Router();
const Review = require("../models/Review");
const Product = require("../models/Product");
const verifyToken = require("../middlewares/verify-token");
const upload = require("../middlewares/multer");
const cloudinary = require("../utils/cloudinary");

router.post(
  "/reviews/:productID",
  [verifyToken, upload.single("photo")],
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const review = new Review();
      review.headline = req.body.headline;
      review.body = req.body.body;
      review.rating = req.body.rating;
      review.user = req.decoded._id;
      review.productID = req.params.productID;
      review.photo = result.secure_url;
      console.log(req.params.productID);

      await Product.updateOne(
        { _id: req.params.productID },
        { $push: { reviews: review._id } }
      );

      let saveReview = await review.save();

      if (saveReview) {
        res.json({
          success: true,
          message: "SuccessFullt added Review!",
        });
      }
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  }
);

router.get("/reviews/:productID", async (req, res) => {
  try {
    const ProductReviews = await Review.find({
      productID: req.params.productID,
    })
      .populate("user")
      .exec();

    res.json({
      success: true,
      reviews: ProductReviews,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
});
module.exports = router;
