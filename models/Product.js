const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ProductSchema.virtual("averageRating").get(function () {
  if (this.reviews.length > 0) {
    let sum = this.reviews.reduce((total, review) => {
      return total + review.rating;
    } , 0);

    return sum / this.reviews.length;
  }

  return 0;
});
module.exports = mongoose.model("Product", ProductSchema);
