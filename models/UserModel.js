const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema -->datbase -collectoin bind..

const userSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  age: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  hobbies: [{ type: String }],
  bloodGroup:{
    enum:["A+","A-","B+","B-","O+","O-"],
    type:String
  },
  roleId:{
    type:Schema.Types.ObjectId,
    ref:"role"
  },
  email:{
    type:String
  },
  profilePic:{
    type:String
  },
  password:{
    type:String
  }
});

// mongoose.model("users",userSchema)
// module.exports = userSchema

module.exports = mongoose.model("users", userSchema);
