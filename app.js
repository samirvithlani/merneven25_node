console.log("App file loaded successfully!");
// const username = require("./user") //user file load...
// console.log(`username = ${username}`)

const user = require("./user")
console.log(user)
console.log(`${user.username}`)
console.log(`${user.userAge}`)

// const employee = require("./employee") //employee == function
// //console.log(employee)
// employee("ram",22,"ram@gmail")

const employee = require("./employee")
//console.log(employee)
employee.setEmployeeData("ram",22,"ram@gmail")
var data = employee.getEmployee()
console.log(data)