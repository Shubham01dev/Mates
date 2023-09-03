const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path")
const env = require("./environment")

// makeing the connection between the mail agent and the server
const transpoter = nodemailer.createTransport(env.smpt)


// this function made to create template using ejs.
const renderTemplate = (data, relativePath) =>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, "../views/Mailer", relativePath),
        data,
        function(err, template){
            if(err){
                console.log("error while rendering template", err)
                return;
            }
            mailHtml = template
        }
    ) 

    return mailHtml;
}


module.exports = {
    transpoter,
    renderTemplate
}

