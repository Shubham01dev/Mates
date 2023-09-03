const queue = require("../config/Kue");
const comment_mailer = require("../mailer/comments_mails");


queue.process("emails", function(job, done){
    console.log("email worker is processing the job", job.data)

    comment_mailer.newComment(job.data)

    done();
})


module.exports = queue;