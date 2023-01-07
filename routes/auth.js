const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/verify-token");
const jwt = require("jsonwebtoken");

// signup route
router.post("/auth/signup", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.json({
        success: false,
        message: "Please fill all fields!",
      });
    } else {
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      await newUser.save();

      let token = jwt.sign(newUser.toJSON(), process.env.SECRET_KEY, {
        expiresIn: 604800,
      });

      res.json({
        success: true,
        token: token,
        message: "Successfulle create a new user!",
        user: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// profile route
router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({
      _id: req.decoded._id,
    });

    if (foundUser) {
      res.json({
        success: true,
        user: foundUser,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
