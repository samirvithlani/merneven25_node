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


app.get("/employeebygender/:gender",(req,res)=>{

    const gender = req.params.gender;

    const foundEmployees = employees.filter((emp)=>emp.gender == gender)
    if(foundEmployees && foundEmployees.length >0){
        res.json({
            message:"employee fouind with criteria",
            data:foundEmployees
        })
    }
    else{
        res.json({
            message:"employees not found with given criteria",
            data:[]
        })
    }

})

app.get("/employees1",(req,res)=>{
    
    const{name,age} =req.query
    if(name ==undefined || age == undefined){
        res.json({
            message:"req params are not passed.."
        })
    }
    else{
        const foundEmployee = employees.filter((emp)=>emp.age == age && emp.name == name)
        if(foundEmployee){
            res.json({
                message:"employee found with criteria",
                data:foundEmployee
            })
        }
        else{
            res.json({
                message:"employee not found with criteria",
                data:[]
            })
        }
    }
})

//server..
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})