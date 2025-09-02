const express = require("express")
const mongoose = require("mongoose")
//expres object..
const app = express() //
app.use(express.json()) //application/json -- type

//routes
const userRoutes = require("./routes/UserRoutes")
app.use(userRoutes) //server app // routes

//localhost:3000/role/role - post ,get
const roleRoutes = require("./routes/RoleRoutes")
app.use("/role",roleRoutes)




mongoose.connect("mongodb://127.0.0.1:27017/mern_evn_2_node").then(()=>{
console.log("db connected..")
}).catch((err)=>{

})


//server..
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})