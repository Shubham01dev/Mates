const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const Extract = require("passport-jwt").ExtractJwt;
const env = require("./environment");

const User = require("../models/Schema");

let opt = {
    jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret
}

passport.use(new jwtStrategy(opt, function(jwtPayload, done){
    User.findById(jwtPayload._id).then(function(user){
         if(user){
            return done(null, user);
         }else{
            return done(null,false)
         }        
    }).catch((err)=>{
        console.log("Internal error")
           return done(err, false)
    })

}))

module.exports = passport
