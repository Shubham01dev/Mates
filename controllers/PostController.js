const Post = require("../models/Post");
const Comment = require("../models/Comments");
const Like = require("../models/Likes");

try {
  module.exports.Create = async function (req, res) {
    let post;
    if (req.body.content) {
      post = await Post.create({
        content: req.body.content,
        user: req.user._id,
      });
    }
    
    if(req.xhr){
      return res.status(200).json({
        post:post,
        message: "Post Created"
      })
    }

    return res.redirect("back");
  };
} catch (err) {
  req.flash("error", "unabel to add you post");
}

// Delteting post

try {
  module.exports.delete = async function (req, res) {
    let post = await Post.findById(req.params.id);
  
    // idealy we should use _id but we are using id because it would automatically convert the id to a string
    
    if (post.user == req.user.id) {
      // post.remove(); remove method is deprecated it will not work
      Post.deleteOne({ _id: req.params.id }).catch((err) => {
        req.flash("error", "getting error while deleting post");
      });
      
      Comment.deleteMany({ userpost: req.params.id }).catch((err) => {
        req.flash("error", "getting error while deleting comments", err);
      });

      Like.deleteMany({ likeabels: req.params.id }).catch(()=>{
        console.log("error while deleting LIkes ", err)
      })
      
      if(req.xhr){
        return res.status(200).json({
          post: post,
          message: "Post Deleted"
        })
      }
      
      return res.redirect("back");
    } else {
      console.log("You are not Authorise to delete others Post");
      return res.redirect("back");
    }
  };
} catch (err) {
  console.log("err while removing post", err);
  return res.redirect("back");
}
