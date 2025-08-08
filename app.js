const express = require("express")
const mongoose = require("mongoose")
//expres object..
const app = express() //

//nosql -->mongodb --mongoose

//required usermodel
const userSchema = require("./models/UserModel")

app.get("/users",async(req,res)=>{
    //db.users.find()
    //db.users == userSchema
    const users = await userSchema.find()
    res.json({
        data:users
    })
})


mongoose.connect("mongodb://127.0.0.1:27017/mern_evn_2_node").then(()=>{
console.log("db connected..")
}).catch((err)=>{

})


//server..
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})