const router = require("express").Router();
const Owner = require("../models/Owner");
const upload = require("../middlewares/multer");
const cloudinary = require("../utils/cloudinary");

// post owner
router.post("/owner", upload.single('photo') , async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = result.secure_url;

    await owner.save();
    res.json({
      succuss: true,
      msg: "Success Create New Owner!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

// get owner
router.get("/owner", async (req, res) => {
  try {
    let owners = await Owner.find();
    res.json({
      success: true,
      owners: owners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      meesage: "nothing owner ...",
    });
  }
});

// get a single owner
router.get('/owner/:id' , async(req , res)=>{
    try {
        let owner = await Owner.findById({
            _id : req.params.id
        })
        res.json({
            success : true,
            owner : owner
        })
    } catch (error) {
        res.status(500).json({
            success : true ,
            msg : error.message
        })
    }
})


module.exports = router;
