const mongoose = require("mongoose")
const Schema = mongoose.Schema; //schema -->datbase -collectoin bind..

const userSchema = new Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    status:{
        type:Boolean
    }
})

// mongoose.model("users",userSchema)
// module.exports = userSchema

module.exports = mongoose.model("users",userSchema)