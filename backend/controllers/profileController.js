
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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await startProfileWorkflow(updatedUser);
    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

module.exports = { getProfile,getAllProfile, updateProfile, createProfile };
