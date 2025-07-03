const express = require("express")
const auth = require("../Middleware/auth.js")
const { createCourse, getcourse } = require("../Controller/courseController")


const router = express.Router()

router.post("/create",auth,createCourse)
router.get("/get",auth,getcourse)


module.exports = router