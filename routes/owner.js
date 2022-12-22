const router = require('express').Router();
const Owner = require('../models/Owner');

// post owner
router.post('/owner', async (req , res)=>{
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = `result.secure_url`;

        await owner.save();
        res.json({
            succuss : true,
            msg :'Success Create New Owner!'
        })
    } 
    catch (error) {
        res.status(500).json({
            success : false ,
            msg : error.message
        })
    }
})

// get owner
router.get('/owner' , async (req , res) => {
    try {
        let owners = await Owner.find();

        res.json({
            success: true , 
            owners : owners
        })
    }catch (error) {
        res.status(500).json({
            success: false , 
            meesage : "nothing owner ..."
        })
    }
})
module.exports = router;