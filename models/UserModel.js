const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema -->datbase -collectoin bind..

const userSchema = new Schema({
  name: {
    type: String,
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
  }
});

// mongoose.model("users",userSchema)
// module.exports = userSchema

module.exports = mongoose.model("users", userSchema);
