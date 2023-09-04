const env = require("./environment");
const fs =require("fs")
const path = require("path")

// To acces the file (assets) created by gulp 
module.exports = (app) =>{
    app.locals.assetPath = function(filePath){
          let succesor;
          if (filePath.includes(".css")){
              succesor = "/css/"
          }else{
            succesor = "/js/"
          }
          if(env.name == "Development"){
            return filePath
          }

          return succesor+ JSON.parse(fs.readFileSync(path.join(__dirname, "../assets/js/rev-manifest.json")))[filePath]
    }
}