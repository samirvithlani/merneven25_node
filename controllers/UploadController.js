const multer = require("multer")

const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    //key ; value
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=="image/jpeg" || file.mimetype=="image/jpg" || file.mimetype=="image/png"){
            cb(null,true) // true ->success/ accepted..
        }
        else{
            cb(new Error("only images are allowd"),false)
        }
    }
}).single("file") //filedName
//array(3)
//any()

const uploadFile= async(req,res)=>{


    upload(req,res,(err)=>{
        console.log("req.file...",req.file)
        console.log("req.body...",req.body)
        if(err){
            res.status(500).json({
                message:"error while uploading file ",
                err:err.message
            })
        }
        else{
            res.status(201).json({
                message:"file uploaded successfully",
                data:req.file
            })
        }
    })

}
module.exports = {
    uploadFile
}
