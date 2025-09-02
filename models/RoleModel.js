const mongoose = require("mongoose")
const Schema = mongoose.Schema

const roleModel = new Schema({
    name:{
        type:String
    }
})

module.exports = mongoose.model("role",roleModel)
//collection name = role