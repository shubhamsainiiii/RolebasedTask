const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        Role: {
            type: String,
            required: true
        },
        superadmin_id: {
            type: mongoose.Schema.ObjectId,
            require: true,
            ref: "superadmin"
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('client', userSchema);