const testMiddleware = (req,res,next)=>{

    if(req.body==undefined){
        res.status(400).json({
            message:"request body is required !!"
        })
    }
    else{
        next()
    }


}
module.exports = testMiddleware