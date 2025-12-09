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

const Redis = require("ioredis")
const {Queue} = require("bullmq")


//redis connection...
const redisConnection = new Redis({
    host:"127.0.0.1",
    port:6379
})

//queue.
const myQueue = new Queue("taskQueue",{connection:redisConnection})

app.post("/add-job",async(req,res)=>{

    const {name} = req.body;
    await myQueue.add("task",{name},{delay:0})
    res.json({
        message:"job added for" + name
    })
})



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

    socket.on('message',(data)=>{
        console.log("message -->",data)
        //socket.emit("receiveMessage",data.toUpperCase())
        socket.broadcast.emit("receiveMessage",data.toUpperCase())
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

const fakeData = {
    1:{name:"raj",age:23},
    2:{name:"jay",age:23},
    3:{name:"amit",age:23},
    4:{name:"parth",age:23}
}


//global middeware
const cacheMiddleware = async(req,res,next)=>{

    const{userId} = req.params;
    try{
        const cacheData = await redisConnection.get(userId)
        if(cacheData){
            console.log("cache hit...")
            return res.json(JSON.parse(cacheData))
        }
        else{
            console.log("cache miss..")
            next()
        }
    }catch(err){
        console.log("redis err..")
        next()
    }

}
app.get("/cuser/:userId",cacheMiddleware,(req,res)=>{

    const{userId} = req.params;
    const userData = fakeData[userId] //db user.findById
    //store data in cacheMemory
    redisConnection.setex(userId,6000,JSON.stringify(userData))
    return res.json(userData)

})



const PORT = 3000

server.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})