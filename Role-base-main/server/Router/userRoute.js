const express = require("express")
const auth = require("../Middleware/auth.js")
const { createUsers, getUsers, getClientUser, userLogin, sendOtpToUser, resetPassword } = require("../Controller/userController");

const router = express.Router()

router.post("/create",auth,createUsers)
router.get("/",auth,getUsers)
router.get("/getclient/:c_id",auth,getClientUser)
router.post("/login",userLogin)
router.post("/otp/:id",auth,sendOtpToUser);
router.post("/reset",auth,resetPassword);

module.exports = router