const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
    Comments : {
        type : String,
        required : true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialWebApp',
    },
    userpost:{
       type : mongoose.Schema.Types.ObjectId,
       ref: 'Post',

    },
    like:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Likes",
        }
      ]

}, {
    timestamps: true
})


const Comments = mongoose.model('Comments', CommentsSchema)

module.exports = Comments