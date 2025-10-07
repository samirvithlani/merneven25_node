const userModel = require("../models/UserModel");
const mailutil = require("../utils/MailUtil");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "samir"; //24

//function

const getAllUsers = async (req, res) => {
  //const users = await userModel.find(); //[]
  const users = await userModel.find().populate("roleId", "name"); //[] task
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
  try {
    //password encrypt:
    //10 -->salt round --> hash..
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    //const savedUser = await userModel.create(req.body);
    const savedUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    //mailUtil.sen...(savedUser.email,"subject","subject")
    //file path ..cloudinary..secure_url:db-->profilpic

    res.status(201).json({
      message: "user saved successfully !!",
      data: savedUser,
    });
  } catch (err) {
    res.json({
      message: "error while saving user",
      err: err,
    });
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

const updateUser = async (req, res) => {
  //update table name set ,, ? where id =?
  //db.users.update({set},{id})
  const id = req.params.id;
  //req.body
  //const updatedUser = await userModel.findByIdAndUpdate(id,req.body) //old data
  const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  }); //new data
  if (updatedUser) {
    res.json({
      message: "user updated successfully !!",
      data: updatedUser,
    });
  } else {
    res.json({
      message: "user not found !!",
      data: null,
    });
  }
};

//if hobby is exist it should not add and throw message that this hobby is already exist..
//$pull -->
//validation if hoobby is exist then pull it or else throw message that given hobby is not avaialble
const addNewHobby = async (req, res) => {
  //update user set hooby = req.bodu]y.hobby where _id = req.params.id
  //db.users.update({set:{hobbies.push("xyz")}},{_id:id})

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { hobbies: req.body.hobby } },
      { new: true }
    );
    res.json({
      message: "user updated successfully !!",
      data: updatedUser,
    });
  } catch (err) {
    res.json({
      message: "error while adding hobby",
      err: err,
    });
  }
};

//fb --> email -->password[haashes] ==>plain passwors
const loginUser = async (req, res) => {
  const { email, password } = req.body; //password -- >plain password
  const foundUserFromEmail = await userModel.findOne({ email: email });
  //{password:"hashedpassword.."}
  if (foundUserFromEmail) {
    //(password --plain password--req.body,hashedpassword -->db)
    //sam ---samlsanasjknlkasnkjasnasklnslkanm -- true
    if (bcrypt.compareSync(password, foundUserFromEmail.password)) {
      //tokenn --->
      //const token = jwt.sign(foundUserFromEmail.toObject(),secret)
      const token = jwt.sign({ id: foundUserFromEmail._id }, secret,{expiresIn:60});
      res.status(200).json({
        message: "user login sucess",
        //data:foundUserFromEmail
        token: token,
      });
    } else {
      res.status(401).json({
        message: "invalid credentials",
      });
    }
  } else {
    res.status(404).json({
      message: "user not found..register first..",
    });
  }
};

const getUserFromToken = async (req, res) => {
  const token = req.body.token;
  //token -->aslknjksjsasbkjnaskjbssabshabkjsanaskjsnsakjsansakjsansjkan id
  //token decode...
  try {
    const decodetoken = jwt.verify(token, secret);
    //{
    //   "id": "68dfc7414c032e0c9800948a",
    //   "iat": 1759841369
    // }
    const userFromToken = await userModel.findById(decodetoken.id);
    res.status(200).json({
      message: "user found from token",
      user: userFromToken,
    });
  } catch (err) {
    res.status(401).json({
      message: "invalid token...",
      err: err,
    });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  addNewHobby,
  loginUser,
  getUserFromToken
};
