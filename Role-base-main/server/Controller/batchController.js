const batch = require("../Models/batchModel")


exports.createBatch = async (req, res) => {
 
  const c_id = req.user.client;
  const user_id = req.user._id;
  
  try {
    const { name,course} = req.body;
    const alreadyEmail = await batch.findOne({ name });
    if (alreadyEmail) {
      return res.status(400).send("batch already created");
    }
    const data = { name,user_id,course, client:c_id };
    const newUser = new batch(data);
    await newUser.save();

    return res
      .status(200)
      .json({ msg: "batch Created Successfully", newUser});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getbatch = async(req, res)=>{
     const data = await batch.find().populate("client").populate("user_id").populate("course");
    const abc = { data };
    return res.status(200).send(abc);
}