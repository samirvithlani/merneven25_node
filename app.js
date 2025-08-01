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


var employees = [
    {
        id:101,
        name:"ram",
        age:23,
        salary:23000,
        gender:"male"
    },
    {
        id:102,
        name:"seeta",
        age:23,
        salary:25000,
        gender:"female"
    },
    {
        id:103,
        name:"shyam",
        age:25,
        salary:30000,
        gender:"male"
    }
]

//localhost:3000/employees
app.get("/employees",(req,res)=>{
    res.json({
        message:"employee fatchedd.",
        data:employees
    })
})

//find employee by id
app.get("/employee/:id",(req,res)=>{

//    console.log(req.params.id) //{id:}
    const foundEmployee = employees.find((emp)=>emp.id == req.params.id)
    if(foundEmployee){
        res.json({
            message:"employee found!",
            data:foundEmployee
        })
    }
    else{
        res.json({
            message:"employee not found with given id",
            data:null
        })
    }
})


//server..
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})