const cloundinary = require("cloudinary").v2

const uploadToCloud = async(path)=>{

    cloundinary.config({
        cloud_name:"",
        api_key:"",
        api_secret:""
    })

    const cloudinaryResponse = await cloundinary.uploader.upload(path)

    return cloudinaryResponse;
}
module.exports = {
    uploadToCloud
}