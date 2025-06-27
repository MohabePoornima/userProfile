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
            required: false
        },
        city: String,
        pincode: String,
        profileImage : String
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model("userDetails", userSchema);
module.exports = { User };