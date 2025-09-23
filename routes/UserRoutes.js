const router = require("express").Router()
const userController = require("../controllers/UserController")
const testMiddleware = require("../middleware/TestMiddleware")
router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)

router.post("/user",testMiddleware,userController.addUser)

router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
router.put("/addhobby/:id",userController.addNewHobby)
module.exports = router