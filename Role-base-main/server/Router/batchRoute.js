const express = require("express")
const auth = require("../Middleware/auth.js")
const { createBatch, getbatch } = require("../Controller/batchController.js")


const router = express.Router()

router.post("/create",auth,createBatch)
router.get("/get",auth,getbatch)


module.exports = router