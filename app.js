const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const cron = require("node-cron")
//expres object..
const app = express() //
app.use(express.json()) //application/json -- type
app.use(cors())

//routes
const userRoutes = require("./routes/UserRoutes")
app.use(userRoutes) //server app // routes

//localhost:3000/role/role - post ,get
const roleRoutes = require("./routes/RoleRoutes")
app.use("/role",roleRoutes)

const employeeroutes = require("./routes/EmployeeRoutes")
app.use("/emp",employeeroutes)

const uploadRoutes = require("./routes/UploadRoutes")
app.use("/upload",uploadRoutes)



mongoose.connect("mongodb://127.0.0.1:27017/mern_evn_2_node").then(()=>{
console.log("db connected..")
}).catch((err)=>{

})

//cron jobs
 
// *    *    *   *      *
// sec  min hour month weekday

//* every time
//, multipule values
//- range
// / steps

//every 10 second job.

//*/10 * * * *

//every min
// * * * * *

//runs every day 7 am

//0 0 7 * *



cron.schedule("*/10 * * * * *",()=>{
    console.log("job runs at every 10 seconds")
})


//server..
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})