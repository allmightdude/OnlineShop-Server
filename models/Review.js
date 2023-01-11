const mongoose = require("mongoose");

const Reviewchema = mongoose.Schema({
  headline: String,
  body: String,
  rating: Number,
  photo: String,
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Review", Reviewchema);
