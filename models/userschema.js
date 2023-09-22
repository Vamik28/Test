const mongoose = require("mongoose");
//user->id,fulname ,emai,mob,address,cityid,companyid,
const userSchema = new mongoose.Schema({
      name:{
        type: String,
        
      },
      email:{
        type: String,
        
      },
      mob:{
        type: String,
        
      },
      password:{
        type: String,
      }
})
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
