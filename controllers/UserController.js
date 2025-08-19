const userModel = require("../models/UserModel")

//function

const getAllUsers = async(req,res)=>{

    const users = await userModel.find() //[]
    if(users && users.length>0){
        res.json({
            message:"user fateched successfully!!",
            data:users
        })
    }
    else{
        res.json({
            message:"user not found.."
        })
    }

}

const getUserById = async(req,res)=>{

    const id = req.params.id
    const foundUser = await userModel.findById(id) //{}
    if(foundUser){
        res.json({
            message:"user found",
            data:foundUser
        })
    }
    else{
        res.json({
            message:"user not found.."
        })
    }

}

const addUser=async(req,res)=>{
    //db.users.create(req.body)
    //userModel.create(req.body)
    const savedUser = await userModel.create(req.body)
    res.json({
        message:"user saved successfully !!",
        data:savedUser
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser
}