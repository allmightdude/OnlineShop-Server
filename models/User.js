const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
});

UserSchema.pre("save", function (next) {
  let user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10 , function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(user.password , salt , null , function(err , hash){
        if(err){
          return next(err);
        }

        user.password = hash;
        next();
      })
    });
  }else{
    return next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
