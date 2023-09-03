// require the library
const mongoose = require("mongoose")
const env = require("./environment")

// connect to the database
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`)

// accquire the connection to check the connectivity
const db = mongoose.connection;


// handeling error if there while connecting
db.on("error", console.error.bind(console, "error in conneting to db"))

//  checking whether the connetion is succesfull or not
db.once("open", function(){
    console.log("Successfully connected to data base")
})

module.exports = db