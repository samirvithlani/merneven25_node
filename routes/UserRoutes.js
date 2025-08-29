const router = require("express").Router()
const userController = require("../controllers/UserController")
router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.post("/user",userController.addUser)
router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
router.put("/addhobby/:id",userController.addNewHobby)
module.exports = router