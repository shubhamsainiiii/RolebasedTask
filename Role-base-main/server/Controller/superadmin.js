const userModel = require('../Models/superadmin.js')

const jwt = require('jsonwebtoken');
// const moment = require("moment");
require('dotenv').config();
const User = require("../Models/userModel.js")


exports.createadmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name, email, password)) {
            return res.status(400).json({ message: 'all fields all required' })
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'email already exist' })
        }
        const data = req.body;
        const newAdmin = new userModel(data);
        const newData = await newAdmin.save();

        console.log(newData._id, "newdata")
        const userData = { name, email, password, superadmin_id: newData._id, role: "superadmin" };

        console.log(userData, "userrr")

        const newUser = new User(userData)
        await newUser.save()

        return res.status(200).json({ msg: "SuperAdmin is created", newAdmin, newUser });

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!(email)) {
            return res.status(400).json({ message: 'please signup first' })
        }
        const dbpassword = user.password;

        if (password !== dbpassword) {
            return res.status(400).json({ message: "password not match" })
        }

        const token = jwt.sign({ email: email }, process.env.SECRETKEY, { expiresIn: '1h' });
        console.log('>>token', token);


        return res.status(200).json({ message: 'login successfully', token })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


