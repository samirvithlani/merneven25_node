
const userValidationSchema = require("../validationschema/UserValidationSchema")

const requestMiddleware = async(req,res,next)=>{

    try{
        await userValidationSchema.parseAsync(req.body)
        //{} --req.body
        next()
    }catch(err){
        res.status(400).json({
            message:"invalid request",
            err:err
        })
    }


}
module.exports =requestMiddleware