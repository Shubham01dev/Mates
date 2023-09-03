const passport = require("passport");
const User = require("../models/Schema");
const googleOauth2 = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const env = require("./environment");



passport.use(new googleOauth2({
    clientID: env.google_clientID,
    clientSecret: env.google_clientSecret,
    callbackURL: env.google_callbackURL,
},function(accessToken, refreshToken, profile,done){ 
    User.findOne({email: profile.emails[0].value})
    .then(function(user){
        if(user){
            return done(null,user)
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString("hex")
            }).then((user)=>{
              return done(null,user)
            }).catch((err)=>{
                console.log("error in creating new user comming from goole DB",err)
                return done(err, false)
            })
        }
    }).catch((err)=>{
        return done(err, false)
    })

}))

module.exports = passport