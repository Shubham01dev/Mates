const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Avatar_path = "/Uploads/user/avatar";

const SocialWebAppSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    friendship: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", Avatar_path));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// static method

SocialWebAppSchema.statics.uploadAvatar = multer({ storage: storage }).single(
  "avatar"
);
SocialWebAppSchema.statics.avatarPath = Avatar_path; // this line made AvatarsPath publically available

// Model

const SocialWebApp = mongoose.model("SocialWebApp", SocialWebAppSchema);

module.exports = SocialWebApp;
