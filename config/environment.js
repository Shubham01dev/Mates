const fs =require('fs');
const path = require('path');
const rfs = require("rotating-file-stream");

const logDirectory =path.join(__dirname, "../production_logs")
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


const accessLogStream = rfs.createStream("access.log",{
    interval:"1d",
    path: logDirectory
})

const Development = {
    name: 'Development',
    session_secret : "encrypt",
    Public : "/public",
    db: "SocialWebApp",
    smpt : {
        service: "gmail",
        host: "smtp.gmail.com",
        port : 587,
        secure: false,
        auth: {
            user: "shubhamsahu01.ss@gmail.com",
            pass: "bsonhagratlacufx"
        }
    },
    google_clientID: "220330674131-603qvunorqt8rtoglbsnmac6mqiak9vr.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:8000/user/auth/google/callback",
    jwt_secret : "monu",
    morgan:{
        mode: "dev",
        options:{stream: accessLogStream}
    }

}

const production = {
    name: 'production',
    session_secret : process.env.SocialApp_session_secrect,
    Public :  process.env.SocialApp_PublicPath,
    db: process.env.SocialApp_db,
    smpt : {
        service: "gmail",
        host: "smtp.gmail.com",
        port : 587,
        secure: false,
        auth: {
            user: process.env.SocialApp_Guser,
            pass: process.env.SocialApp_Gpass
        }
    },
    google_clientID: process.env.SocialApp_googleCId,
    google_clientSecret: process.env.SocialApp_googleCsecret,
    google_callbackURL: process.env.SocialApp_googleCallbackURL,
    jwt_secret : process.env.SocialApp_jwtSecret,
    morgan:{
        mode: "combined",
        options:{stream: accessLogStream}
    }

}


module.exports = eval(process.env.NODE_ENV == undefined ? Development : eval(process.env.NODE_ENV))