const Post = require("../models/Post");
const User= require("../models/Schema");

module.exports.home = async function (req, res) {


  // writing code using thenables

  // Post.find({}).populate("user").populate({
  //     path: "comments",
  //     populate: {
  //         path: "user"
  //     }
  // }).then(function(post){
  //     users.find({}).then(function(user){
  //         return res.render("home", {
  //             title: "SocialWebApp",
  //             Post : post,
  //             all_users: user
  //         })

  //     })

  // })

  // async way of write the code which make it more cleaner and understandable

  try{
    let post = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user"
      },
    }).populate("like")
    
    let user = await User.find({}).populate("friendship")
    // console.log(user)    


  return res.render("home", {
    title: "SocialWebApp",
    Post: post,
    all_users: user,
  });
  }catch(err){
    console.log("there is an error while renfring home page ",err)
  }
};
