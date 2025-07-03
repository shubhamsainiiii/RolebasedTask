const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.createUsers = async (req, res) => {
 
  const c_id = req.user.client;
 
  try {
    const { name, email, password, role} = req.body;
    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail) {
      return res.status(400).send("user already created");
    }
    const data = { name, email, password, role, client:c_id };
    const newUser = new User(data);
    await newUser.save();

    return res
      .status(200)
      .json({ msg: "User Created Successfully", newUser});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
   const {role} = req.user
   const c_id = req.user.client
   const s_id = req.user.superadmin_id;
   console.log(c_id,s_id,"KKK")
   if(role==="superadmin"){
    const result = await User.find().populate("superadmin_id").populate("client");
   
    return res.status(200).send(result);
   }
   else if(role==="client" ||role==="admin" ||role==="HR" ||role==="sub-admin" ||role==="trainer" ){
    const result = await User.find({ client: c_id })
      .populate("superadmin_id")
      .populate("client");
    return res.status(200).send(result);
   }
 
    
};
exports.getClientUser = async (req, res) => {
  const { role } = req.user;
  const {c_id} = req.params
  if (role === "superadmin") {
    const result = await User.find({ client: c_id })
      .populate("superadmin_id")
      .populate("client");
    return res.status(200).send(result);
  }
};

exports.userLogin = async(req,res)=>{
    const {email,password} = req.body
    const alreadyEmail = await User.findOne({ email })
      .populate("superadmin_id")
      .populate("client");
    if(!alreadyEmail){
        return res.status(400).send("email not found")
    }

    const dbpassword = alreadyEmail.password

    if(password!==dbpassword){
        return res.status(400).send("password not match")
    }

    const token = jwt.sign({email:alreadyEmail.email},process.env.SECRETKEY ,{expiresIn:"4h"})

    return res.status(200).json({msg:"user logged in ",token,user:alreadyEmail})
}

// Generate 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOtpToUser = async (req, res) => {
  const { email } = req.body;
  const {id} = req.params

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();
   
    const data = {otp}
    const result = await User.findByIdAndUpdate(id,data,{new:true})
    
  
console.log(user,"DDDDDDDD")
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "purohitdevansh22@gmail.com",      // your email
        pass:"cqer iuar cqsl jrtc",       // your email password or app password
      },
    });

    // Mail options
    const mailOptions = {
      from: "purohitdevansh22@gmail.com",
      to: user.email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return res.status(200).send(result);

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: error.message });
  }
};
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Check if the provided OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 3. Update the password and clear the OTP
    user.password = newPassword;
    user.otp = undefined;
    await user.save();

    return res.status(200).json({ message: "✅ Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: error.message });
  }
};

