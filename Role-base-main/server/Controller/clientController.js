const client = require('../Models/clientModel.js')
const User = require('../Models/userModel.js')

const jwt = require('jsonwebtoken');
// const moment = require("moment");
require('dotenv').config();


exports.createclient = async (req, res) => {
    try {
        const s_id = req.user.superadmin_id
        const { name, email, password } = req.body;
        if (!(name, email, password)) {
            return res.status(400).json({ message: 'all fields all required' })
        }
        const user = await client.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'email already exist' })
        }
        const data = { name, email, password,Role:"client", superadmin_id: s_id };
        const newClient = new client(data);
        const newData = await newClient.save();
        
        const clientdata = {
            name,
            email,
            password,
            client: newData._id,
            superadmin_id: s_id,
            role: "client",

        };
        

        const abc = new User(clientdata)
        await abc.save()

        return res.status(201).send({ message: "data create successfully" ,newData,clientdata});

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
   exports.getClients = async(req,res)=>{
  const users = req.user;
  const s_id = req.user.superadmin_id
  console.log(users,"User");
  const {role} = req.user
  if(role==="superadmin" )
  {
    const result = await client.find({ superadmin_id :s_id}).populate("superadmin_id");
    const data = await User.find();
    const abc = { result, data };
    return res.status(200).send(abc);
  }
  else{
    return res.status(400).send("you are not authorized");
  }
    
}
exports.loginclient = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await client.findOne({ email });
        if (!(user)) {
            return res.status(400).json({ message: 'please signup first' })
        }
        const dbpassword = user.password;

        if (password !== dbpassword) {
            return res.status(400).json({ message: "password not match" })
        }

        const token = jwt.sign({ email: email }, process.env.SECRETKEY, { expiresIn: '1d' });
        console.log('>>token', token);


        return res.status(200).json({ message: 'login successfully', token })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


