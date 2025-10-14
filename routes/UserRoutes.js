const router = require("express").Router()
const userController = require("../controllers/UserController")
const testMiddleware = require("../middleware/TestMiddleware")
const requestMiddleware = require("../middleware/requestMiddleware")
const authMiddleware  = require("../middleware/authMiddleware")
router.get("/users",authMiddleware.verifyUser,userController.getAllUsers)
router.get("/user/:id",userController.getUserById)

//router.post("/user",testMiddleware,userController.addUser)
//uploadmiddware
//router.post("/user",uploadMiddlware,requestMiddleware,userController.addUser)
router.post("/user",userController.addUser)

router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
router.put("/addhobby/:id",userController.addNewHobby)
router.post("/login",userController.loginUser)
router.post("/userfromtoken",userController.getUserFromToken)
module.exports = router