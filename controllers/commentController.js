const Comment = require("../models/Comments");
const Post = require("../models/Post");
const comments_mails = require("../mailer/comments_mails");
const queue = require("../config/Kue");
const worker = require("../worker/comment_email_worker");
const Like = require("../models/Likes");


module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      try {
        let comment = await Comment.create({
          Comments: req.body.Comments,
          user: req.user._id,
          userpost: req.body.post,
        });

        post.comments.push(comment);
        post.save();

        comment = await comment.populate("user", "name email"); // the second argument in populate enabels us to populate specific fielid only
        // comments_mails.newComment(comment);
        let job = queue.create("emails", comment).save((err) => {
          if (err) {
            console.log("err while creatign job", err);
          }
          console.log("new Job", job.id);
        });

        if (req.xhr) {
          return res.status(200).json({
            comment: comment,
            post: post,
            message: "Comment Created",
          });
        }

        res.redirect("/");
      } catch (err) {
        console.log("error while creating comment", err);
        res.redirect("/");
      }
    }
  } catch (err) {
    console.log("err while finding post for comment", err);
  }
};

module.exports.delete = async function (req, res) {
  const comment = await Comment.findById({ _id: req.params.id });
  if (comment.user == req.user.id) {
    const postId = comment.userpost;
    Comment.deleteOne({ _id: req.params.id }).catch(function (err) {
      console.log("error while delteing comment", err);
    });

    Like.deleteMany({ likeabels: req.params.id }).catch(() => {
      console.log("error while deleting LIkes ", err);
    });

    const post = await Post.findByIdAndUpdate(postId, {
      $pull: { comments: req.params.id },
    });
    return res.redirect("back");
  } else {
    console.log("You are not allowed to delete comment");
    res.redirect("back");
  }
};
