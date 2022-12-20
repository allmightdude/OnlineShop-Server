const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
   title : String,
   unique : true,
   required : true
})

module.exports = mongoose.model('Category' , CategorySchema)
