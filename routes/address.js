const router = require("express").Router();
const Category = require("../models/Category");
const verifytoken = require("../middlewares/verify-token");
const Address = require("../models/Address");
const axios = require("axios");
const countryList = require("country-list");
const User = require("../models/User");

router.post("/addresses", verifytoken, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliverInstructions = req.body.deliverInstructions;
    address.securityCode = req.body.securityCode;

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
      success: true,
      addresses: addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// Get Single Address
router.get("/addresses/:id", verifytoken, async (req, res) => {
  try {
    let address = await Address.findById({
      _id: req.params.id,
    });

    res.json({
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

//Update Address
router.put("/addresses/:id", verifytoken, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({
      _id: req.params.id,
    });

    if (foundAddress) {
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.streetAddress)
        foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliverInstructions)
        foundAddress.deliverInstructions = req.body.deliverInstructions;
      if (req.body.securityCode)
        foundAddress.securityCode = req.body.securityCode;
    }

    await foundAddress.save();

    res.json({
      success: true,
      message: "Successfully updated the address.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// Delete Address
router.delete("/addresses/:id", verifytoken, async (req, res) => {
  try {
    let deletedAddress = await Address.findOneAndDelete({
      user: req.decoded._id,
      _id: req.params.id,
    });

    let user = await User.updateOne(
      { _id: req.decoded._id },
      { $unset: { address: 1 } }
    );

    if (user) {
      delete user.address;
    }

    if (deletedAddress) {
      res.json({
        success: true,
        message: "Successfully Deleted the address.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// Set a Address as default
router.put("/addresses/set/default", verifytoken, async (req, res) => {
  try {
    let doc = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      {
        $set: {
          address: req.body.id,
        },
      }
    );

    if (doc) {
      res.json({
        success: true,
        message: "Successfully Set this address as default.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// Get all countries
router.get("/countries", async (req, res) => {
  try {
    let countries = countryList.getData();
    res.json({
      countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

module.exports = router;
