const router = require("express").Router();
const Category = require("../models/Category");
const verifytoken = require("../middlewares/verify-token");
const Address = require("../models/Address");

router.post("/addresses", verifytoken, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.country = country;
    address.fullName = fullName;
    address.streetAddress = streetAddress;
    address.city = city;
    address.state = state;
    address.zipCode = zipCode;
    address.phoneNumber = phoneNumber;
    address.deliverInstructions = deliverInstructions;
    address.securityCode = securityCode;

    await address.save();

    res.json({
      success: true,
      message: "Successfully added address!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

router.get("/addresses", verifytoken, async (req, res) => {
  try {
    let addresses = await Address.find({
      user: req.decoded._id,
    });

    res.json({
        success : true,
        addresses : addresses
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});
module.exports = router;
