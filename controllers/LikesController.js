const likes = require("../models/Likes")
const Comments = require("../models/Comments")
const Post = require("../models/Post");


module.exports.toggleLike = async function(req,res){
    try{
    let likeabels;
    let Delete  = false;

    //  on which compponent like has been made Post or comment
     if(req.query.type == "Post"){
          likeabels = await Post.findById({_id: req.query.id}).populate("like")
     }else{
          likeabels = await Comments.findById({_id : req.query.id}).populate("like")
     }


    //  Checking Likes exsist or not
     let existingLike = await likes.findOne({
        likeabels: req.query.id,
        onModel: req.query.type,
        user : req.user._id
     })

     if(existingLike){
         likeabels.like.pull(existingLike._id);
         likeabels.save();
          
         existingLike.deleteOne({ _id: existingLike._id }).catch((err) => {
            req.flash("error", "getting error while deleting likabels");
          });
          Delete = true;
     }else{
        let newLike = await likes.create({
            user: req.user._id,
            likeabels: req.query.id,
            onModel: req.query.type,
        })

        likeabels.like.push(newLike._id);
        likeabels.save()
         
     }
     
     if(req.xhr){
        return res.status(200).json({
            likeabels: likeabels,
            delete : Delete     
        })
     }
    
    return res.json({
        message: "Requested successfully ",
        data: {
            delete : Delete
        }
    })

    }catch(e){
        console.log("error while creating toggleLikes", e)
    }

}