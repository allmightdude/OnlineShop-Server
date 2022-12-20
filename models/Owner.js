const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name : String , 
    about : String , 
    photo : String
})

module.exports = mongoose.model('Owner' , ownerSchema);