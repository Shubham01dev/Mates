// these are are actions
const User = require("../models/Schema");
const Post = require("../models/Post");
const Friend = require("../models/Friends");
const fs = require("fs");
const path = require("path");

module.exports.profile = async function (req, res) {
  let post = await Post.find({ user: req.params.id })
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  let friend = await Friend.find({}).populate("form_user")

  try {
    let user = await User.findById({ _id: req.params.id });
    return res.render("user", {
      title: "User_profile",
      user_profile: user,
      Post: post,
      friend: friend
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.singIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  } else {
    return res.render("singIn", {
      title: "SingIn",
    });
  }
};

module.exports.singUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  } else {
    return res.render("singUp", {
      title: "SingUp",
    });
  }
};

module.exports.Create = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      console.log("password does not match");
      return res.redirect("/user/singUp");
    } else {
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return res.redirect("back");
        } else {
          User.create(req.body)
            .then(() => {
              return res.redirect("/user/singIn");
            })
            .catch((err) => {
              console.log("err while add user in DB", err);
            });
        }
      });
    }
  } catch (err) {}
};

module.exports.Create_session = function (req, res) {

  req.flash("success", "Successfully logged in");
  return res.redirect("/");
};

module.exports.destory = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
  });

  req.flash("success", "Successfully logged out");
  return res.redirect("/user/singIn");
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body).then(function (user) {
  //     res.redirect("/");
  //   });
  // } else {
  //   console.log("unabel to update");
  //   return res.redirect("/");
  // }

  // After using Multer

  if (req.user.id == req.params.id) {
    const user = await User.findById(req.params.id);
    User.uploadAvatar(req, res, function (err) {
      if (err) {
        console.log("******Multer Error******", err);
      }

      user.name = req.body.name;
      user.email = req.body.email;

      if (fs.existsSync(path.join(__dirname + ".." + user.avatar))) {
        if (user.avatar) {
          fs.unlinkSync(path.join(__dirname + ".." + user.avatar));
        }
      }

      if (req.file) {
        user.avatar = User.avatarPath + "/" + req.file.filename;
      }
      //  its very important to save the user to save the changes
      user.save();
      return res.redirect("back");
    });
  } else {
    console.log("unabel to update");
    return res.redirect("/");
  }
};


// reset password

module.exports.resetPassword = function(req,res){
     return res.render("resetPassword", {
      title: "Reset Password"
     })
}
let email;
module.exports.newPassword = function(req,res){
     email = req.body.email;
     return res.render("new_Password", {
      title: "New Password"
     })
}
module.exports.updatePassword = function(req,res){
  if(req.body.password == req.body.confirm){
    User.findOneAndUpdate({email : email}, {password: req.body.password}).then((user)=>{
         console.log(user)
         return res.redirect("/");
    }).catch((err)=>{
      console.log("unabel to update password",err)

    })
  }else{
    console.log("Please enter carefully")
  }

   
}