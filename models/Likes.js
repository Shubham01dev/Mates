
const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
       
    },
    // this is the wau of dynamically refreing to a path
    likeabels: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"

    },
    onModel:{
        type: String,
        required: true,
        enums: ["Post", "Comments"]
    },
    likeCount:{
        type: Number,
        
    }

},{
    timestamps: true
})

const Likes = mongoose.model("Likes", LikeSchema)

module.exports = Likes