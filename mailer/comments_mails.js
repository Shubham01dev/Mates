const nodemailerConfig = require("../config/Nodemailer");


// this function is sending finallt the mail to the user 
exports.newComment = (comment)=>{
        let htmlString = nodemailerConfig.renderTemplate({comment: comment}, "/comment/new_comments.ejs");
        nodemailerConfig.transpoter.sendMail({
              from: "shubhamsahu01.ss@gmail.com",
              to : comment.user.email,
              subject: "New comment published",
              html: htmlString

            },(err,info)=>{
                if(err){
                    console.log("err while sending mail", err)
                    return;
                }
                console.log("message sent", info)
                return;
            })
}