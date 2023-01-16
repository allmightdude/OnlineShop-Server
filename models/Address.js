const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  country: String,
  fullName: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: String,
  phoneNumber: String,
  deliverInstructions: String,
  securityCode: String,
});

module.exports = mongoose.model("Address", AddressSchema);
