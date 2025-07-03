const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        user_id: { type: mongoose.Schema.ObjectId, ref: "users" },
         client: { type: mongoose.Schema.ObjectId, ref: "client" },
          course: { type: mongoose.Schema.ObjectId, ref: "courses" },
    }, 
    { timestamps: true }
);
module.exports = mongoose.model('batch', userSchema);