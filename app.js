const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const cron = require("node-cron") //c
//expres object..
const app = express() // c

const http = require("http") //builtin   //c
const server = http.createServer(app) //object... of http.. //c
const {Server} = require("socket.io") //Server class //c
app.use(express.json()) //application/json -- type //c
app.use(cors()) //c





//socket server...
const io = new Server(server,{
    cors:{
        origin:"*", //all port are whitelisted..
        methods:["GET","POST"]

    }
})

//connection is builtin event.. server hit..
io.on('connection',(socket)=>{
    console.log("new user connected... with id ",socket.id)

    socket.on("test",(data)=>{
        console.log("data...",data)
    })

    socket.on("demo",(data)=>{
        console.log("demo called...",data)
    })


})



//routes
const userRoutes = require("./routes/UserRoutes")
app.use(userRoutes) //server app // routes

//localhost:3000/role/role - post ,get
const roleRoutes = require("./routes/RoleRoutes")
app.use("/role",roleRoutes)

const employeeroutes = require("./routes/EmployeeRoutes")
app.use("/emp",employeeroutes)

const uploadRoutes = require("./routes/UploadRoutes")
const { da } = require("zod/locales")
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



// cron.schedule("*/10 * * * * *",()=>{
//     console.log("job runs at every 10 seconds")
// })


//server..
const PORT = 3000

server.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})