const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    categoryID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    ownerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Owner"
    },
    title : String,
    description : String,
    photo : String,
    price : Number,
    stockQuantity : Number,
    rating : [{    
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }]
} , {
    toObject : { virtuals : true },
    toJSON : { virtuals : true }
})

module.exports = mongoose.model('Product' , ProductSchema)