const express = require("express");
const { getProfile, updateProfile, createProfile, getAllProfile } = require("../controllers/profileController");
const profileRoutes = express.Router();

profileRoutes.post("/", createProfile);
profileRoutes.get("/", getAllProfile)
profileRoutes.get("/:id", getProfile);
profileRoutes.put("/:id", updateProfile);

module.exports = profileRoutes;
