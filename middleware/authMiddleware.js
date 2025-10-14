const jwt = require("jsonwebtoken")
const secret = "samir"; //24

const verifyUser = async(req,res,next)=>{


    //Bearer token
    var token = req.headers.authorization
    if(token){

        //Bearer token..
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1] //Bearer lkamsalksnajksansalksjasknsajlsa
            
            try{

                const data = jwt.verify(token,secret)
                console.log(data) 
                //{ id: '68dfc7414c032e0c9800948a', iat: 1760447020, exp: 1760447080 }
                //id -->db
                //userModel.findById(data.id).populate -->userObj -->role..ADMIN
                next() //move to controller

            }catch(err){
                
                res.status(401).json({
                    message:"invalid token..",
                    err:err
                })
            }
        }
        else{
            res.status(401).json({
            message:"token is not bearer token..."
        })    
        }

    }else{
        res.status(401).json({
            message:"token is missing.."
        })
    }



}
module.exports = {
    verifyUser
}