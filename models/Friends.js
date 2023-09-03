const mongoose = require("mongoose");


const FriendSchema =new mongoose.Schema({
    //  user who sent the  request
    form_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialWebApp"
    },
 
    // user who accepted the request
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialWebApp"
    },
    show:{
        type: Boolean,
    }
},{
    timestamps: true,
})



const Friendship = mongoose.model("Friendship", FriendSchema);

module.exports = Friendship;