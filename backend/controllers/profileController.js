
const { startProfileWorkflow } = require("../../temporal/client");
const { User } = require("../models/user.model");
// Create new profile


const createProfile = async (req, res) => {
  console.log("Enter in post request");
  
  
  try {
    const newUser = new User(req.body);
    await newUser.save();
    await startProfileWorkflow(newUser);
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Creation failed", error: err.message });
  }
};

//all user
const getAllProfile = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "User not found" });
    res.json({allUser : users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get individual profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, mobileNumber, city, pincode } = req.body;

    // Basic validation for mobileNumber to prevent backend crash
    if (!mobileNumber || mobileNumber.trim() === "") {
      return res.status(400).json({ message: "Mobile number is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, mobileNumber, city, pincode },
      { new: true }
    );

   try {
      await startProfileWorkflow(updatedUser);
    } catch (e) {
      console.warn("Temporal workflow skipped:", e.message);
    }

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

module.exports = { getProfile,getAllProfile, updateProfile, createProfile };
