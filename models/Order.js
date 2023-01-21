const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  products: [
    {
      productID: { type: mongoose.Schema.Types.ObjectId },
      quantity: Number,
      price: Number,
    },
  ],
  estimatedDelivery: String,
});

module.exports = mongoose.model("Order", OrderSchema);
