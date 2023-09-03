const User = require("../models/Schema");
const Friends = require("../models/Friends");

// sending request
module.exports.Friends = async function (req, res) {
  try {
    if (req.query.id == req.user.id) {
      let friend = await Friends.create({
        form_user: req.query.id,
        show: true,
      });
      if (friend) {
        console.log("friend request has been sent");
      } else {
        console.log("unabel to send the friend request");
      }
    }
    return res.redirect("/");
  } catch (err) {
    console.log("err with the Friend Controller", err);
    return res.redirect("/");
  }
};

// accept friendship
module.exports.Friendship = async function (req, res) {
  try {
    let Mates = await Friends.findByIdAndUpdate(req.query.frdDoc, {
      to_user: req.query.id,
      show : false,
    });
    let Profileuser = await User.findById(req.query.id);
    let userFrnd = await User.findById(Mates.form_user);
    if (Profileuser) {
      Profileuser.friendship.push(Mates._id);
      Profileuser.save();
    }
    if (userFrnd) {
      userFrnd.friendship.push(Mates._id);
      userFrnd.save();
    }

    return res.redirect(`/user/profile/${req.user.id}`);
  } catch (err) {
    console.log("err with the Friend Controller", err);
    return res.redirect("/");
  }
};
