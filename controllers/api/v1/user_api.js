const User = require("../../../models/Schema")
const jwt = require("jsonwebtoken")
const env =require("../../../config/environment")

module.exports.Create_token = async function (req, res) {
    try{
     let user = await User.findOne({email : req.body.email});
   
     if(!user || user.password != req.body.password){
          return res.status(401).json({
            message: "Invalid username or password",

          })
        }
      return res.status(200).json({
        message: "succesful created the we jwt token",
        data: {
            token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: 1000}) 
        }
      })
    
    }catch(e){
        console.log("***********",e)
        return res.status(500).json({
            message: "internal server error"
        })
    }

  };