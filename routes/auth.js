const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/verify-token");
const jwt = require("jsonwebtoken");

// signup route
router.post("/auth/signup", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
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

// login user
router.post("/auth/login", async (req, res) => {
  try {
    console.log(req.body);
    let foundUser = await User.findOne({
      email: req.body.email,
    });

    console.log(`foundUser`);
    if (!foundUser) {
      res.status(403).json({
        success: false,
        msg: "Authorization Failed , User not found",
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token = jwt.sign(foundUser.toJSON(), process.env.SECRET_KEY, {
          expiresIn: 604000, // 1 week
        });
        res.json({
          success: true,
          token: token,
        });
      } else {
        res.status(403).json({
          success: false,
          msg: "Authorization Failed , wrong password",
        });
      }
    }
  } catch (error) {
    res.send({
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
    }).populate('address');

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

router.put("/auth/user", verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id });
    if (req.body.name) foundUser.name = req.body.name;
    if (req.body.email) foundUser.email = req.body.email;
    if (req.body.password) foundUser.password = req.body.password;

    await foundUser.save();

    res.json({
      success: true,
      user: foundUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
