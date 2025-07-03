const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  otp: {type : String},  
  role: {
    type: String,
    enum: ["superadmin" ,"client", "admin", "sub-admin" , "HR" , "trainer" , "student"],
  },
  superadmin_id: { type: mongoose.Schema.ObjectId, ref: "superadmin" },
  client: { type: mongoose.Schema.ObjectId, ref: "client" },
});

const User = mongoose.model("users",userSchema)
module.exports = User