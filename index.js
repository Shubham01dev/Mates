const express= require("express")
const port =8000;
const app = express();
require("./config/views_helper")(app);
const db = require("./config/mongoose")
const model = require("./models/Schema")
const passport = require("passport");
const LocalStrategy = require("./config/passort-local-strategy");
const JwtStrategy = require("./config/passport-jwt-strategy")
const googleStrategy = require("./config/passport-googleOauth2-strategy")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const route = require("./route")
const bodyParser = require("body-parser")
const expressEjsLayouts = require("express-ejs-layouts");
const Post = require("./models/Post");
const Comments = require("./models/Comments")
const Likes =require("./models/Likes");
const flash = require("connect-flash")
const flashWare = require("./config/middleware")
const env = require("./config/environment")
const morgan = require("morgan")
const path = require("path")
// Scoket intializations
const socketServer = require("http").Server(app) 
const Socket = require("./config/Socket").chatSocket(socketServer)
socketServer.listen(5000,()=>{
    console.log("chat server is listening on port number 5000")

});



// static files
app.use(express.static("."+ env.Public))
app.use("/Uploads",express.static(__dirname + "/Uploads"))

// using Layouts
app.use(expressEjsLayouts)

// extract style from subs pages to Layout
app.set("layout extractStyles", true) // we can provide only single space between layout and extract(statement)
app.set("layout extractScripts", true)

// getting form data
app.use(bodyParser.urlencoded({extended:true}))

//seting out ejs files
app.set("view engine", "ejs")
app.set("views", "./views")

app.use(session({
    name: "Codial",
    secret: env.session_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        max_age: 60000
    },
    store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/SocialWebApp",
        },function(err){
            if(err){
                console.log(err)
            }
        }
        )
    }))


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashWare.setFlash);

app.use(morgan(env.morgan.mode, env.morgan.options));
app.use("/", route)
    
// using morgan


app.listen(port, function(err){
    if(err){
        console.log(err, "error while running express")
    }
    console.log("Server is running on port no:-", port)
})