const course = require("../Models/coursesModel")


exports.createCourse = async (req, res) => {
 
  const c_id = req.user.client;
  const user_id = req.user._id;
 
  try {
    const { name} = req.body;
    const alreadyEmail = await course.findOne({ name });
    if (alreadyEmail) {
      return res.status(400).send("course already created");
    }
    const data = { name, user_id, client:c_id };
    const newUser = new course(data);
    await newUser.save();

    return res
      .status(200)
      .json({ msg: "course Created Successfully", newUser});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getcourse = async(req, res)=>{
     const data = await course.find().populate("client").populate("user_id");
    const abc = { data };
    return res.status(200).send(abc);
}