var uemail = undefined
var uage = undefined
var uname = undefined

const setEmployeeData = (name,age,email)=>{
    // console.log(`name = ${name}`)
    // console.log(`age = ${age}`)
    // console.log(`email = ${email}`)

    uemail = email
    uname = name
    uage = age
}
const getEmployee = ()=>{

    return `employee name = ${uname} age = ${uage} email = ${uemail}`
}

//module.exports = setEmployeeData
module.exports= {
    setEmployeeData,
    getEmployee
}