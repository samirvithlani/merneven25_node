const router = require("express").Router()
const employeeController = require("../controllers/EmployeeController")
router.get("/",employeeController.getAllEmployees)
router.post('/',employeeController.createEmployee)
router.delete("/:id",employeeController.deleteEmployee)
router.put("/:id",employeeController.updateEmployee)
module.exports = router

