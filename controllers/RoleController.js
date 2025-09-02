const roleModel = require("../models/RoleModel")

const createRole = async(req,res)=>{

    //try catch
        const savedRole = await roleModel.create(req.body)
        res.json({
            message:"role created successfully!!",
            data:savedRole
        })

}

const getAllRoles = async(req,res)=>{


    const roles = await roleModel.find()
    res.json({
        message:"roles fetch successfully!!",
        data:roles
    })
    
}

module.exports = {
    createRole,getAllRoles
}