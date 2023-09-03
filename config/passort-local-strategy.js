const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/Schema");


let opt= {
  usernameField: "email",
  passReqToCallback: true,
}

passport.use(
  new LocalStrategy(
    opt,
    function (req,email, password, done) {
      User.findOne({ email: email }).then((user) => {
        if (!user || user.password !== password) {
          req.flash("error","invalid user Credentials");
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    if (!user) {
      return done(err, false);
    }
    return done(null, user);
  });
});

passport.CheckAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/singIn");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
