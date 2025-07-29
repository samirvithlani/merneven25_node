const express = require("express")
//expres object..
const app = express() //


//url
//localhost:3000/test
app.get("/test",(req,res)=>{

    console.log("test api called....")
    res.send("test api hit")
})

const user = {
    id:101,
    name:"amit",
    age:23,
    status:"active"
}

app.get("/user",(req,res)=>{

    //res.json(user)
    res.json({message:"user fetch successfully!!",data:user})
})

const users = [
    {
        id:1,
        name:"ram",
        age:22,
        status:"active",
    },
    {
        id:2,
        name:"seeta",
        age:22,
        status:"not active",
    },
    {
        id:3,
        name:"ramila",
        age:24,
        status:"active",
    }
]

//localhost:3000/users
app.get("/users",(req,res)=>{
    res.json({
        message:"users fetched..",
        users:users
    })
})





//server..
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})