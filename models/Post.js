const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialWebApp", // Collection name given in the mongoose.model
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    like:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes",
      }
    ]
  },
  {
    timestamps: true,
  }
);

const UserPost = mongoose.model("Post", Post);

module.exports = UserPost;
