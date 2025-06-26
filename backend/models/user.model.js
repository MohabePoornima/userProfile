const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { 
            type: String,
             required: true
             },
        email: { 
            type: String, 
            required: true 
        },
        mobileNumber: { 
            type: String, 
            required: true 
        },
        city: String,
        pincode: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("userDetails", userSchema);
module.exports = { User };