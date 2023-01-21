const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
   type :{
    type : String,
    unique : true,
    required : true
   }
})

module.exports = mongoose.model('Order' , OrderSchema)
