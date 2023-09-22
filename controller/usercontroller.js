const jwt = require("jsonwebtoken");
const ObjectID = require("mongodb").ObjectId;
const user = require("../models/userschema.js");
const { response } = require("express");
const register = {
   post: (req, res) => {
    console.log(req.body);
    const new_user = new user({
       email: req.body.email,
       password: req.body.password,
    });
    user.findOne({email:new_user.email}).then((data)=>{
        if(data == null){
            new_user.save();
            res.send("user created successfully");
        }
        else{
            throw new Error("User already exists");
        }
    })
       
    
    
  },
};
const login = {
  post: (req, res) => {
    user.find({ email: req.body.email }).then((data) => {
      //   console.log(data);
      if (data !== undefined) {
        if (data[0].password == req.body.password) {
          const userpayload = {
            id: new ObjectID(data[0]._id),
            email: data[0].email,
          };

          //token generation
          jwt.sign(
            { userpayload },
            "abc",
            { expiresIn: "30000000000s" },
            (err, token) => {
              //

              if (err) {
                res.send(err);
              }
              res.send(token);
              // console.log(token);
            }
          );
          //   res.render("home2.ejs");
        } else {
          res.send(res.send("password is incorrect"));
        }
      }
    });
  },
};
const updateprofile = {
   put: async(req,res) =>{
       try{
        const tokenData = req.userdata.userpayload;
        // res.send(tokenData.id);
        const userdata = await user.find({_id: tokenData.id});
        
         if(userdata.length === 0){
           return new Forbidden("user not found")
         }
         
         const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mob: req.body.mob,

         }
     const newdata  = await user.updateOne({_id:tokenData.id},data); 
     const usjk  = await user.find({_id:tokenData.id}); 
     res.send(usjk);
     
    } catch (error) {
       if(error instanceof NotFound){
           throw error;
       }
       return this.sendErrorResponse(req, res, error);
    }
}
       
       
}

module.exports = {
  register,
  login,
  updateprofile,
};
