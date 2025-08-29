const userModel = require("../models/UserModel");

//function

const getAllUsers = async (req, res) => {
  const users = await userModel.find(); //[]
  if (users && users.length > 0) {
    res.json({
      message: "user fateched successfully!!",
      data: users,
    });
  } else {
    res.json({
      message: "user not found..",
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const foundUser = await userModel.findById(id); //{}
  if (foundUser) {
    res.json({
      message: "user found",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found..",
    });
  }
};

// const addUser = async (req, res) => {
//   //db.users.create(req.body)
//   //userModel.create(req.body)
//   const savedUser = await userModel.create(req.body);
//   res.json({
//     message: "user saved successfully !!",
//     data: savedUser,
//   });
// };

const addUser = async (req, res) => {
  //db.users.create(req.body)
  //userModel.create(req.body)
  try{
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "user saved successfully !!",
    data: savedUser,
  });
  }catch(err){
    res.json({
      message:"error while saving user",
      err:err
    })
  } 
};

const deleteUser = async (req, res) => {
  //id ==>req.params.id
  //db.users.remove({id:101})
  const id = req.params.id;
  const deletedUser = await userModel.findByIdAndDelete(id);

  if (deletedUser) {
    res.json({
      message: "user deleted successfully !!",
      data: deletedUser,
    });
  } else {
    res.json({
      message: "user not found",
      data: null,
    });
  }
};

const updateUser= async(req,res)=>{

    //update table name set ,, ? where id =?
    //db.users.update({set},{id})
    const id = req.params.id;
    //req.body
    //const updatedUser = await userModel.findByIdAndUpdate(id,req.body) //old data
    const updatedUser = await userModel.findByIdAndUpdate(id,req.body,{new:true}) //new data
    if(updatedUser){
        res.json({
            message:"user updated successfully !!",
            data:updatedUser
        })
    }
    else{
        res.json({
            message:"user not found !!",
            data:null
        })
    }

}

//if hobby is exist it should not add and throw message that this hobby is already exist..
//$pull -->
//validation if hoobby is exist then pull it or else throw message that given hobby is not avaialble
const addNewHobby = async(req,res)=>{

  //update user set hooby = req.bodu]y.hobby where _id = req.params.id
  //db.users.update({set:{hobbies.push("xyz")}},{_id:id})

  try{

      const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{$pull:{hobbies:req.body.hobby}},{new:true})
      res.json({
        message:"user updated successfully !!",
        data:updatedUser
      })
  }catch(err){

    res.json({
      message:"error while adding hobby",
      err:err
    })
  }


}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  addNewHobby
};
