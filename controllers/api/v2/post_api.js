module.exports.index = function (req,res){
    return res.staus(200).json({
         message: 'success v2',
         post:[]
    })
}