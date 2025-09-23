const zod = require("zod")

const userValidationSchema = zod.object({
    name:zod.string(),
    age:zod.number(),
    status:zod.boolean(),
    hobbies:zod.array(zod.string()),
    bloodGroup:zod.enum(["A+","A-","B+","B-","O+","O-"]),
    roleId:zod.string(),
    email:zod.string()
})
module.exports = userValidationSchema
