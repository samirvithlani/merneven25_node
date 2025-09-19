const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeModel = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    hobbies:[{
        type:String
    }],
    bloodGroup:{
        enum:["A+","B+","A-","B-"],
        type:String
    }
})
module.exports  = mongoose.model("employees",employeeModel)