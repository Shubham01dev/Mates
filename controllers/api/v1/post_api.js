const Post = require("../../../models/Post");
const Comment = require("../../../models/Comments");


module.exports.index = async function (req,res){
    let post = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

    return res.status(200).json({
         message: 'success v1',
         post: post
    })
}


try {
    module.exports.delete = async function (req, res) {
      let post = await Post.findById(req.params.id);
       
      // here we are checking the authorization
       if(post.user == req.user.id){
        Post.deleteOne({ _id: req.params.id }).catch((err) => {
          req.flash("error", "getting error while deleting post");
        });
        
        Comment.deleteMany({ userpost: req.params.id }).catch((err) => {
          req.flash("error", "getting error while deleting comments", err);
        });
        
        return res.status(200).json({
            message: "Post and comments associated with that Deleted"
        })
      }else{
        return res.status(401).json({
          message: "You are not allowed to delete post of others"
        })
      }
    }
}
    catch (err) {
    console.log("err while removing post", err);
    return res.status(401).json({
        message: "Unabel to delete post"
    })
  }
  