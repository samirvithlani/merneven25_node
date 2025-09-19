const employeeModel = require("../models/EmployeeModel");

const getAllEmployees = async (req, res) => {
  const employees = await employeeModel.find();
  res.json({
    message: "employee fetched...",
    data: employees,
  });
};

const createEmployee = async (req, res) => {
  try {
    const savedEmployee = await employeeModel.create(req.body);
    res.json({
      message: "employee saved...",
      data: savedEmployee,
    });
  } catch (err) {
    res.json({
      message: "error while saving employee",
      err: err,
    });
  }
};
const deleteEmployee=  async(req,res)=>{

    //id -- req.params
    const id = req.params.id
    const deletedEmp = await employeeModel.findByIdAndDelete(id)
    if(deletedEmp){
        res.json({
            message:"employee deleted..."
        })
    }
    else{
        res.json({
            message:"no employee found to delete..."
        })
    }

}

const updateEmployee = async(req,res)=>{

    const id = req.params.id;
    const updatedEmploye = await employeeModel.findByIdAndUpdate(id,req.body,{new:true})
    if(updatedEmploye){
        res.json({
            message:"employee updated successfully",
            data:updatedEmploye
        })
    }
    else{
        res.json({
            message:"no employee found..",
            data:null
        })
    }




}

const addHobby = async(req,res)=>{

    const id = req.params.id
    console.log(id)
    const hobby = req.body.hobby;
    console.log(hobby)
    const updatedEmp = await employeeModel.findByIdAndUpdate(id,{$push:{hobbies:req.body.hobby}},{new:true})
    res.json({
        message:"hobby added",
        data:updatedEmp
    })
}
module.exports = {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  addHobby
};
